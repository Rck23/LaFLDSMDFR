import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Hearder';
import React from 'react'

export default function  Tiendalayout( {
    children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen ">
      <Header />

      <div className="px-0 sm:px-10">{children}</div>


    <Footer/>
    </main>
  );
}

