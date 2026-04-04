"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { CirclePlay, Factory, PackageCheck, ShieldCheck, Video } from "lucide-react";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pick } from "@/lib/i18n";

const localVideoPath = "/videos/product-story.mp4";
const posterPath = "/images/about-brand.png";

type VideoMode = "loading" | "local" | "generated" | "missing";

type PreviewFrame = {
  accent: string;
  image: string;
  label: string;
  text: string;
  title: string;
};

type LoadedPreviewFrame = PreviewFrame & {
  imageElement: HTMLImageElement;
};

function getVideoMimeType() {
  if (typeof window === "undefined" || typeof window.MediaRecorder === "undefined") {
    return null;
  }

  const mimeTypes = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"];
  return mimeTypes.find((value) => window.MediaRecorder.isTypeSupported(value)) ?? null;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Unable to load image: ${src}`));
    image.src = src;
  });
}

function drawRoundedPanel(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

function drawPreviewFrame(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  frame: PreviewFrame,
  progress: number,
) {
  const { width, height } = canvas;

  context.clearRect(0, 0, width, height);
  context.fillStyle = "#0d0a15";
  context.fillRect(0, 0, width, height);

  const sourceRatio = image.width / image.height;
  const targetRatio = width / height;
  const zoom = 1.05 + progress * 0.06;

  let drawWidth = width * zoom;
  let drawHeight = height * zoom;

  if (sourceRatio > targetRatio) {
    drawHeight = height * zoom;
    drawWidth = drawHeight * sourceRatio;
  } else {
    drawWidth = width * zoom;
    drawHeight = drawWidth / sourceRatio;
  }

  const offsetX = (width - drawWidth) / 2 - progress * 28;
  const offsetY = (height - drawHeight) / 2 - progress * 12;

  context.globalAlpha = 1;
  context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

  const overlay = context.createLinearGradient(0, 0, 0, height);
  overlay.addColorStop(0, "rgba(2,6,23,0.18)");
  overlay.addColorStop(0.55, "rgba(2,6,23,0.42)");
  overlay.addColorStop(1, "rgba(2,6,23,0.92)");
  context.fillStyle = overlay;
  context.fillRect(0, 0, width, height);

  context.save();
  drawRoundedPanel(context, 44, 42, 152, 42, 21);
  context.fillStyle = frame.accent;
  context.fill();
  context.restore();

  context.fillStyle = "#f8fafc";
  context.font = "600 18px Arial";
  context.fillText(frame.label, 72, 69);

  context.fillStyle = "#ffffff";
  context.font = "700 44px Arial";
  context.fillText(frame.title, 44, height - 132);

  context.font = "400 24px Arial";
  context.fillStyle = "rgba(248,250,252,0.9)";

  const words = frame.text.split(" ");
  let line = "";
  let lineIndex = 0;

  for (const word of words) {
    const nextLine = line ? `${line} ${word}` : word;
    if (context.measureText(nextLine).width > width - 120) {
      context.fillText(line, 44, height - 88 + lineIndex * 30);
      line = word;
      lineIndex += 1;
    } else {
      line = nextLine;
    }
  }

  if (line) {
    context.fillText(line, 44, height - 88 + lineIndex * 30);
  }
}

async function createGeneratedVideo(frames: PreviewFrame[]) {
  if (
    typeof window === "undefined" ||
    typeof window.MediaRecorder === "undefined" ||
    typeof HTMLCanvasElement === "undefined" ||
    typeof HTMLCanvasElement.prototype.captureStream !== "function"
  ) {
    return null;
  }

  const mimeType = getVideoMimeType();
  if (!mimeType) {
    return null;
  }

  const canvas = document.createElement("canvas");
  canvas.width = 960;
  canvas.height = 540;

  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }

  try {
    const loadedFrames: LoadedPreviewFrame[] = await Promise.all(
      frames.map(async (frame) => ({
        ...frame,
        imageElement: await loadImage(frame.image),
      })),
    );

    if (!loadedFrames.length) {
      return null;
    }

    const stream = canvas.captureStream(10);
    const recorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: 2_000_000,
    });
    const chunks: BlobPart[] = [];

    const finalVideo = new Promise<string | null>((resolve) => {
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onerror = () => {
        stream.getTracks().forEach((track) => track.stop());
        resolve(null);
      };

      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());

        if (!chunks.length) {
          resolve(null);
          return;
        }

        resolve(URL.createObjectURL(new Blob(chunks, { type: mimeType })));
      };
    });

    recorder.start(250);

    const frameDuration = 2200;
    const totalDuration = frameDuration * loadedFrames.length;

    await new Promise<void>((resolve) => {
      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (startTime === null) {
          startTime = timestamp;
        }

        const elapsed = Math.max(0, timestamp - startTime);
        const safeElapsed = Math.min(elapsed, Math.max(0, totalDuration - 16));
        const frameIndex = Math.min(
          loadedFrames.length - 1,
          Math.max(0, Math.floor(safeElapsed / frameDuration)),
        );
        const frameProgress = (safeElapsed % frameDuration) / frameDuration;
        const activeFrame = loadedFrames[frameIndex];

        if (!activeFrame) {
          recorder.stop();
          resolve();
          return;
        }

        drawPreviewFrame(
          context,
          canvas,
          activeFrame.imageElement,
          activeFrame,
          frameProgress,
        );

        if (elapsed >= totalDuration) {
          window.setTimeout(() => {
            recorder.stop();
            resolve();
          }, 180);
          return;
        }

        window.requestAnimationFrame(step);
      };

      window.requestAnimationFrame(step);
    });

    return finalVideo;
  } catch {
    return null;
  }
}

export function ProductVideoSection() {
  const { language } = useAppPreferences();
  const [videoMode, setVideoMode] = useState<VideoMode>("loading");
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const storyAlt = pick(language, {
    en: "Billcoin product story",
    hi: "Billcoin प्रोडक्ट स्टोरी",
    gu: "Billcoin પ્રોડક્ટ સ્ટોરી",
  });

  const previewFrames = useMemo<PreviewFrame[]>(() => [
    {
      accent: "#8b74c4",
      image: "/images/about-brand.png",
      label: pick(language, {
        en: "Step 1",
        hi: "स्टेप 1",
        gu: "સ્ટેપ 1",
      }),
      title: pick(language, {
        en: "Own manufacturing",
        hi: "अपना मैन्युफैक्चरिंग",
        gu: "પોતાનું મેન્યુફેક્ચરિંગ",
      }),
      text: pick(language, {
        en: "We create our own Billcoin range instead of buying finished products from outside suppliers.",
        hi: "हम बाहर के सप्लायर्स से तैयार माल खरीदने के बजाय अपनी Billcoin रेंज खुद बनाते हैं।",
        gu: "અમે બહારના સપ્લાયર્સ પાસેથી તૈયાર માલ ખરીદવાને બદલે પોતાની Billcoin રેન્જ જાતે બનાવીએ છીએ.",
      }),
    },
    {
      accent: "#b39cf0",
      image: "/images/hero-cleaning.png",
      label: pick(language, {
        en: "Step 2",
        hi: "स्टेप 2",
        gu: "સ્ટેપ 2",
      }),
      title: pick(language, {
        en: "Quality and filling",
        hi: "क्वालिटी और फिलिंग",
        gu: "ક્વોલિટી અને ફિલિંગ",
      }),
      text: pick(language, {
        en: "Show mixing, checking, filling, and sealing so customers can see the process is controlled.",
        hi: "मिक्सिंग, चेकिंग, फिलिंग और सीलिंग दिखाइए ताकि ग्राहक देख सके कि प्रक्रिया नियंत्रित है।",
        gu: "મિક્સિંગ, ચેકિંગ, ફિલિંગ અને સીલિંગ બતાવો જેથી ગ્રાહક જોઈ શકે કે પ્રક્રિયા નિયંત્રિત છે.",
      }),
    },
    {
      accent: "#6d58a5",
      image: "/images/distributor-box.png",
      label: pick(language, {
        en: "Step 3",
        hi: "स्टेप 3",
        gu: "સ્ટેપ 3",
      }),
      title: pick(language, {
        en: "Packed and ready",
        hi: "पैक होकर तैयार",
        gu: "પેક થઈને તૈયાર",
      }),
      text: pick(language, {
        en: "Finish with final packed products and a direct message that Billcoin products are made in-house.",
        hi: "अंत में पैक्ड प्रोडक्ट दिखाइए और साफ कहिए कि Billcoin प्रोडक्ट इन-हाउस बनते हैं।",
        gu: "અંતે પેક થયેલા પ્રોડક્ટ બતાવો અને સ્પષ્ટ કહો કે Billcoin પ્રોડક્ટ ઇન-હાઉસ બને છે.",
      }),
    },
  ], [language]);

  const statusCopy = useMemo(() => {
    if (videoMode === "local") {
      return {
        badge: pick(language, {
          en: "Real Video",
          hi: "असली वीडियो",
          gu: "અસલી વિડિયો",
        }),
        title: pick(language, {
          en: "Your uploaded factory video is playing now.",
          hi: "आपका अपलोड किया हुआ फैक्ट्री वीडियो अभी चल रहा है।",
          gu: "તમે અપલોડ કરેલો ફેક્ટરી વિડિયો હાલમાં ચાલી રહ્યો છે.",
        }),
        text: pick(language, {
          en: "This section is reading the local MP4 file and showing your actual production story.",
          hi: "यह सेक्शन लोकल MP4 फाइल पढ़कर आपकी असली प्रोडक्शन स्टोरी दिखा रहा है।",
          gu: "આ વિભાગ લોકલ MP4 ફાઇલ વાંચીને તમારી અસલી પ્રોડક્શન સ્ટોરી બતાવી રહ્યો છે.",
        }),
      };
    }

    if (videoMode === "generated") {
      return {
        badge: pick(language, {
          en: "Live Preview",
          hi: "लाइव प्रीव्यू",
          gu: "લાઇવ પ્રીવ્યૂ",
        }),
        title: pick(language, {
          en: "Built-in preview is playing until your real MP4 is added.",
          hi: "जब तक आपका असली MP4 नहीं जुड़ता, बिल्ट-इन प्रीव्यू चल रहा है।",
          gu: "જ્યાં સુધી તમારું અસલી MP4 ઉમેરાતું નથી, ત્યાં સુધી બિલ્ટ-ઇન પ્રીવ્યૂ ચાલી રહ્યું છે.",
        }),
        text: pick(language, {
          en: "I generated a short story video from your existing brand images so the section is no longer empty.",
          hi: "मैंने आपकी मौजूदा ब्रांड इमेजेस से एक छोटा स्टोरी वीडियो बनाया है ताकि यह सेक्शन खाली न रहे।",
          gu: "તમારી હાલની બ્રાન્ડ ઇમેજિસમાંથી મેં ટૂંકું સ્ટોરી વિડિયો બનાવ્યો છે જેથી આ વિભાગ ખાલી ન રહે.",
        }),
      };
    }

    if (videoMode === "missing") {
      return {
        badge: pick(language, {
          en: "Video Missing",
          hi: "वीडियो नहीं मिला",
          gu: "વિડિયો મળ્યો નથી",
        }),
        title: pick(language, {
          en: "Add a real file to enable your actual factory video.",
          hi: "अपना असली फैक्ट्री वीडियो चालू करने के लिए फाइल जोड़ें।",
          gu: "તમારો અસલી ફેક્ટરી વિડિયો ચાલુ કરવા માટે ફાઇલ ઉમેરો.",
        }),
        text: pick(language, {
          en: `Put an MP4 at ${localVideoPath} and it will replace the preview automatically.`,
          hi: `${localVideoPath} पर MP4 रखें, यह प्रीव्यू अपने आप बदल जाएगा।`,
          gu: `${localVideoPath} પર MP4 મૂકો, આ પ્રીવ્યૂ પોતે બદલાઈ જશે.`,
        }),
      };
    }

    return {
      badge: pick(language, {
        en: "Checking",
        hi: "जांच रहे हैं",
        gu: "ચેક કરી રહ્યા છીએ",
      }),
      title: pick(language, {
        en: "Preparing the product story section.",
        hi: "प्रोडक्ट स्टोरी सेक्शन तैयार किया जा रहा है।",
        gu: "પ્રોડક્ટ સ્ટોરી વિભાગ તૈયાર થઈ રહ્યો છે.",
      }),
      text: pick(language, {
        en: "Checking for a real MP4 first, then building a fallback preview if needed.",
        hi: "पहले असली MP4 जांच रहे हैं, नहीं मिले तो फॉलबैक प्रीव्यू बनाया जाएगा।",
        gu: "સૌપ્રથમ અસલી MP4 ચેક કરી રહ્યા છીએ, ન મળે તો ફોલબેક પ્રીવ્યૂ બનાવાશે.",
      }),
    };
  }, [language, videoMode]);

  useEffect(() => {
    let cancelled = false;
    let generatedUrl: string | null = null;

    const resolveVideo = async () => {
      try {
        const response = await fetch(localVideoPath, {
          method: "HEAD",
          cache: "no-store",
        });

        if (response.ok) {
          if (!cancelled) {
            setVideoSrc(localVideoPath);
            setVideoMode("local");
          }
          return;
        }
      } catch {
        // Ignore and fall back to a generated preview.
      }

      const previewUrl = await createGeneratedVideo(previewFrames);

      if (cancelled) {
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
        return;
      }

      if (previewUrl) {
        generatedUrl = previewUrl;
        setVideoSrc(previewUrl);
        setVideoMode("generated");
        return;
      }

      setVideoSrc(null);
      setVideoMode("missing");
    };

    resolveVideo();

    return () => {
      cancelled = true;

      if (generatedUrl) {
        URL.revokeObjectURL(generatedUrl);
      }
    };
  }, [previewFrames]);

  return (
    <section className="section-y">
      <Container className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:[&>*]:min-w-0">
        <div>
          <Card className="overflow-hidden">
            <div className="surface-video relative overflow-hidden rounded-[30px]">
              {videoSrc ? (
                <video
                  key={videoSrc}
                  className="aspect-video w-full object-cover"
                  controls
                  preload="metadata"
                  poster={posterPath}
                >
                  <source
                    src={videoSrc}
                    type={videoMode === "local" ? "video/mp4" : "video/webm"}
                  />
                </video>
              ) : (
                <div className="relative aspect-video">
                  <Image
                    src={posterPath}
                    alt={storyAlt}
                    fill
                    className="object-cover opacity-80"
                    sizes="(max-width: 1024px) 100vw, 52vw"
                  />
                  <div className="surface-video-fade absolute inset-0" />
                  <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-white">
                    <div className="max-w-sm">
                      <CirclePlay className="mx-auto h-12 w-12 text-primary" />
                      <p className="mt-4 text-lg font-semibold">{statusCopy.title}</p>
                      <p className="mt-2 text-sm text-white/75">{statusCopy.text}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                <Video className="h-3.5 w-3.5" />
                {pick(language, {
                  en: "Product Video",
                  hi: "प्रोडक्ट वीडियो",
                  gu: "પ્રોડક્ટ વિડિયો",
                })}
              </div>

              <div className="surface-video-footer border-t border-white/10 p-5 text-white">
                <div className="flex items-start gap-3">
                  <CirclePlay className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">{statusCopy.badge}</p>
                    <p className="mt-1 text-sm text-white/72">{statusCopy.text}</p>
                    <p className="mt-2 text-sm text-white/72">
                      <code>{localVideoPath}</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <SectionHeading
            eyebrow={pick(language, {
              en: "How We Make It",
              hi: "हम इसे कैसे बनाते हैं",
              gu: "અમે તેને કેવી રીતે બનાવીએ છીએ",
            })}
            title={pick(language, {
              en: "Billcoin creates its own products, not bought from another supplier",
              hi: "Billcoin अपने प्रोडक्ट खुद बनाता है, किसी दूसरे सप्लायर से खरीदे हुए नहीं",
              gu: "Billcoin પોતાના પ્રોડક્ટ પોતે બનાવે છે, બીજા સપ્લાયર પાસેથી લીધેલા નથી",
            })}
            description={pick(language, {
              en: "Use this section to prove your own production, quality control, and packaging process in a direct way.",
              hi: "इस सेक्शन से अपनी प्रोडक्शन, क्वालिटी कंट्रोल और पैकेजिंग प्रोसेस को सीधे दिखाइए।",
              gu: "આ વિભાગમાં તમારી પ્રોડક્શન, ક્વોલિટી કંટ્રોલ અને પેકેજિંગ પ્રક્રિયાને સીધી રીતે બતાવો.",
            })}
          />

          <div className="mt-8 grid gap-4">
            {[
              {
                icon: Factory,
                title: {
                  en: "1. Show your plant or mixing area",
                  hi: "1. अपना प्लांट या मिक्सिंग एरिया दिखाएं",
                  gu: "1. તમારું પ્લાન્ટ અથવા મિક્સિંગ એરિયા બતાવો",
                },
                text: {
                  en: "Start with real visuals from your own setup and state clearly that Billcoin does not buy finished goods from another company.",
                  hi: "अपनी सेटअप के असली विज़ुअल्स से शुरू करें और साफ बताएं कि Billcoin किसी दूसरी कंपनी से तैयार माल नहीं खरीदता।",
                  gu: "તમારા સેટઅપના અસલી વિઝ્યુઅલ્સથી શરૂઆત કરો અને સ્પષ્ટ કહો કે Billcoin બીજી કંપની પાસેથી તૈયાર માલ ખરીદતું નથી.",
                },
              },
              {
                icon: ShieldCheck,
                title: {
                  en: "2. Show quality control",
                  hi: "2. क्वालिटी कंट्रोल दिखाएं",
                  gu: "2. ક્વોલિટી કંટ્રોલ બતાવો",
                },
                text: {
                  en: "Add shots of checking, measuring, sealing, and inspection so the customer can trust the process.",
                  hi: "चेकिंग, मेज़रिंग, सीलिंग और इंस्पेक्शन के शॉट्स जोड़ें ताकि ग्राहक प्रक्रिया पर भरोसा करे।",
                  gu: "ચેકિંગ, માપણી, સીલિંગ અને ઇન્સ્પેક્શનના શોટ્સ ઉમેરો જેથી ગ્રાહક પ્રક્રિયા પર વિશ્વાસ કરે.",
                },
              },
              {
                icon: PackageCheck,
                title: {
                  en: "3. End with packed products",
                  hi: "3. पैक्ड प्रोडक्ट पर खत्म करें",
                  gu: "3. પેક થયેલા પ્રોડક્ટથી પૂર્ણ કરો",
                },
                text: {
                  en: "Finish with your product lineup and one direct message that Billcoin products are made in-house for daily use.",
                  hi: "अपनी प्रोडक्ट लाइनअप के साथ खत्म करें और साफ संदेश दें कि Billcoin प्रोडक्ट रोज़मर्रा उपयोग के लिए इन-हाउस बने हैं।",
                  gu: "તમારી પ્રોડક્ટ લાઇનઅપ સાથે પૂર્ણ કરો અને સ્પષ્ટ સંદેશ આપો કે Billcoin પ્રોડક્ટ રોજિંદા ઉપયોગ માટે ઇન-હાઉસ બને છે.",
                },
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title.en} className="p-6">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/15">
                      <Icon className="h-5 w-5 text-primary" />
                    </span>
                    <div>
                      <p className="text-base font-semibold">{pick(language, item.title)}</p>
                      <p className="mt-2 text-sm text-foreground/72">{pick(language, item.text)}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact?type=distributor" size="lg">
              {pick(language, {
                en: "Talk To Us",
                hi: "हमसे बात करें",
                gu: "અમારી સાથે વાત કરો",
              })}
            </Button>
            <Button href="/products" variant="outline" size="lg">
              {pick(language, {
                en: "See Products",
                hi: "प्रोडक्ट देखें",
                gu: "પ્રોડક્ટ જુઓ",
              })}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
