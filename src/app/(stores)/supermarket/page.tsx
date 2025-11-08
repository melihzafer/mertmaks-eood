import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Супермаркет "САМУИЛ" | MERTMAX ЕООД',
  description: 'Супермаркет САМУИЛ в центъра на Враца - хранителни стоки, напитки, дом и градина. Качествени продукти на ниски цени.',
  openGraph: {
    title: 'Супермаркет "САМУИЛ" | MERTMAX ЕООД',
    description: 'Супермаркет САМУИЛ в центъра на Враца - хранителни стоки, напитки, дом и градина.',
    locale: 'bg_BG',
  },
};

export default function SupermarketPage() {
  return (
    <main className="min-h-screen">
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Супермаркет <span className="text-red-600">САМУИЛ</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Хранителни стоки, напитки, дом и градина в центъра на Враца
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Работно време</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Понеделник - Петък</h3>
              <p className="text-lg text-gray-700">8:00 - 19:00</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Събота - Неделя</h3>
              <p className="text-lg text-gray-700">9:00 - 17:00</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-red-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Категории продукти</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <div 
                key={idx}
                className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2 text-red-600">{cat.name}</h3>
                <p className="text-gray-600">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

const categories = [
  { name: 'Хранителни стоки', description: 'Хляб, мляко, консерви, макаронени изделия' },
  { name: 'Напитки', description: 'Безалкохолни, алкохолни, минерални води' },
  { name: 'Дом и градина', description: 'Битова химия, градински инструменти' },
  { name: 'Козметика', description: 'Лична хигиена, грижа за тялото' },
  { name: 'Деликатеси', description: 'Месо, колбаси, сирена, маслини' },
  { name: 'Замразени', description: 'Замразени храни, сладолед' },
];
