// 'use server'

import Image from 'next/image';

import webAimImg from '@/public/images/resources/webaim.png';
import w3cImg from '@/public/images/resources/w3c.png';
import a11yImg from '@/public/images/resources/a11y.jpeg';
import colorContrastImg from '@/public/images/resources/color-contrast.png';
import nvdaImg from '@/public/images/resources/nvda.jpg';
import Link from 'next/link';

const Resources = () => {
  const resources = [
    {
      name: 'WebAIM',
      image: webAimImg,
      href: 'https://webaim.org/',
      description:
        'WebAIM provides comprehensive web accessibility solutions.',
    },
    {
      name: 'W3C Web Accessibility Initiative (WAI)',
      image: w3cImg,
      href: 'https://www.w3.org/WAI/',
      description:
        'W3C WAI offers guidelines and resources to improve web accessibility.',
    },
    {
      name: 'A11y Project',
      image: a11yImg,
      href: 'https://www.a11yproject.com/',
      description:
        'A11y Project provides tools and resources to help designers and developers create accessible websites.',
    },
    {
      name: 'Color Contrast Checker',
      image: colorContrastImg,
      href: 'https://color.a11y.com/',
      description:
        'Color Contrast Checker helps you test color combinations for accessibility.',
    },
    {
      name: 'NVDA Screen Reader',
      image: nvdaImg,
      href: 'https://www.nvaccess.org/',
      description:
        'NVDA is a free and open-source screen reader for Windows.',
    },
  ];

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-semibold mb-4'>
        Accessibility Resources
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {resources.map((resource, index) => (
          <Link
            href={resource.href}
            target='_blank'
            key={index}
            className='rounded shadow p-4 bg-slate-900'
          >
            <Image
              src={resource.image}
              alt={resource.name}
              className='w-full h-48 object-cover mb-4'
            />
            <h2 className='text-xl font-semibold mb-2'>
              {resource.name}
            </h2>
            <p className='text-gray-600'>{resource.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Resources;
