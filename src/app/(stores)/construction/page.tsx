import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Строителен магазин | MERTMAX ЕООД',
  description: 'Строителен магазин във Враца - инструменти, строителни материали, боядисване, ВиК.',
  openGraph: {
    title: 'Строителен магазин | MERTMAX ЕООД',
    description: 'Строителен магазин във Враца - всичко за строителството и ремонта.',
    locale: 'bg_BG',
  },
};

export default function ConstructionPage() {
  return (
    <main className="min-h-screen">
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-yellow-50 to-blue-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            <span className="text-blue-600">Строителен</span> магазин
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Всичко за строителството и ремонта под един покрив
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Работно време</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Понеделник - Петък</h3>
              <p className="text-lg text-gray-700">8:30 - 18:00</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Събота</h3>
              <p className="text-lg text-gray-700">9:00 - 14:00</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Категории</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <div 
                key={idx}
                className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2 text-blue-600">{cat.name}</h3>
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
  { name: 'Инструменти', description: 'Ръчни и електрически инструменти' },
  { name: 'Боядисване', description: 'Бои, мазилки, гипсови карнизи' },
  { name: 'ВиК материали', description: 'Тръби, фитинги, батerii, санитария' },
  { name: 'Електроматериали', description: 'Кабели, контакти, осветление' },
  { name: 'Дървен материал', description: 'Дъски, греди, ПДЧ, МДФ' },
  { name: 'Крепежни елементи', description: 'Винтове, пирони, дюбели, анкери' },
];
