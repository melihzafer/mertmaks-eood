import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Индустриална база | MERTMAX ЕООД',
  description: 'Индустриална база във Враца - строителни материали, метални изделия, едроплощадна търговия.',
  openGraph: {
    title: 'Индустриална база | MERTMAX ЕООД',
    description: 'Индустриална база във Враца - строителни материали, метални изделия.',
    locale: 'bg_BG',
  },
};

export default function IndustrialPage() {
  return (
    <main className="min-h-screen">
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            <span className="text-pink-600">Индустриална</span> база
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Строителни материали и метални изделия за промишлеността
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Работно време</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Понеделник - Петък</h3>
              <p className="text-lg text-gray-700">8:00 - 17:30</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Събота - Неделя</h3>
              <p className="text-lg text-gray-700">Почивен ден</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-pink-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Продукти и услуги</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod, idx) => (
              <div 
                key={idx}
                className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2 text-pink-600">{prod.name}</h3>
                <p className="text-gray-600">{prod.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

const products = [
  { name: 'Строителни материали', description: 'Тухли, циментови блокчета, хоросан' },
  { name: 'Метални изделия', description: 'Профили, тръби, арматура' },
  { name: 'Едроплощадна търговия', description: 'Големи обеми с отстъпка' },
  { name: 'Транспорт', description: 'Доставка до обект' },
  { name: 'Консултации', description: 'Професионални съвети' },
  { name: 'Поръчки по проект', description: 'Специализирани доставки' },
];
