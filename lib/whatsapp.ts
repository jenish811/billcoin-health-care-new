export function toWhatsAppNumber(rawPhone: string | undefined) {
  if (!rawPhone) return undefined;
  const digits = rawPhone.replace(/[^\d]/g, "");
  return digits.length ? digits : undefined;
}

export function createWhatsAppLink({
  phone,
  text,
}: {
  phone: string | undefined;
  text: string;
}) {
  const number = toWhatsAppNumber(phone);
  const base = number ? `https://wa.me/${number}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(text)}`;
}

