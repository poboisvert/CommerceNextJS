import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { initiateCheckout } from '../lib/payments';

import products from '../products.json';

import { useCart } from '../hooks/usecart';

const Home: NextPage = () => {
  const { cart, updateCart, subtotal, quantity, addToCart, checkout } =
    useCart();
  //console.log('Hook cart  is', cart);

  // Stripes checkout
  const paymentFlow = (id: string) => {
    addToCart({ id });
  };

  console.log(
    'process.env.NEXT_PUBLIC_STRIPE_KEY',
    process.env.NEXT_PUBLIC_STRIPE_KEY
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Store Demo</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href='https://nextjs.org'>THE WATER DESK</a>
        </h1>

        <p className={styles.description}>
          Items: {quantity}
          <br />
          Total: $ {subtotal}
          <br />
          <button className={styles.button} onClick={checkout}>
            Checkout Now
          </button>
        </p>

        <ul className={styles.grid}>
          {/* loop product */}
          {products.map((product) => {
            const { id, title, image, description, price } = product;
            return (
              <li key={id} className={styles.card}>
                <a href='#'>
                  <img src={image} alt={title} />
                  <h3>{title}</h3>
                  <p>${price}</p>
                  <p>{description}</p>
                  <p>
                    <button
                      onClick={() => {
                        //console.log('But Now');
                        paymentFlow(id);
                      }}
                    >
                      Add to cart
                    </button>
                  </p>
                </a>
              </li>
            );
          })}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by
          <img src='/vercel.svg' alt='Vercel Logo' className={styles.logo} />
        </a>
      </footer>
    </div>
  );
};

export default Home;
