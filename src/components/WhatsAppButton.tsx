import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const handleClick = () => {
    const message = encodeURIComponent(
      'Hello UTU EXECUTIVE SAFARIS! I would like to inquire about your safari packages.'
    );
    window.open(`https://wa.me/254716417526?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-[200] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
      title="Chat on WhatsApp"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} className="text-white" />
    </button>
  );
}
