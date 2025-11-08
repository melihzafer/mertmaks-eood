import { StoreMap } from '../components/StoreMap';
import ContactForm from '../components/ContactForm';
import { getStores } from '@/lib/stores';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Контакти | MERTMAX ЕООД',
  description: 'Свържете се с нас - адреси, телефони и работно време на нашите обекти в Самуил',
};

export default function ContactPage() {
  const stores = getStores();

  return (
    <main className='min-h-screen py-16'>
      <div className='container mx-auto px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-12'>
            <h1 className='text-4xl md:text-5xl font-bold mb-4'>
              Свържете се <span className='text-red-600'>с нас</span>
            </h1>
            <p className='text-xl text-gray-600'>
              Посетете ни в един от нашите три обекта в Самуил
            </p>
          </div>

          <StoreMap stores={stores} height='600px' />

          {/* Contact Form Section */}
          <section className='mt-16'>
            <ContactForm />
          </section>

          <div className='mt-16 text-center'>
            <h2 className='text-2xl font-semibold mb-6'>Общи Въпроси</h2>
            <div className='grid md:grid-cols-2 gap-8 max-w-3xl mx-auto text-left'>
              <div>
                <h3 className='font-semibold mb-2'>Работно време</h3>
                <p className='text-gray-600'>Понеделник - Неделя: 08:00 - 19:00</p>
              </div>
              <div>
                <h3 className='font-semibold mb-2'>Имейл</h3>
                <p className='text-gray-600'>
                  <a href='mailto:info@mertmax.bg' className='text-red-600 hover:underline'>
                    info@mertmax.bg
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
