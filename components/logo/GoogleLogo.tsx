"use client";
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Google from '@/public/google.svg'

const GoogleLogo = () => {
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <div>
      {isDark ? (
        <Image
          src= {Google} //"../public/Github_dark.svg" // Path to your dark theme logo
          alt="Dark Theme Logo"
          width={20}
          height={20}
        />
      ) : (
        <Image
          src= {Google} //"./public/Github_light.svg" // Path to your light theme logo
          alt="Light Theme Logo"
          width={20}
          height={20}
        />
      )}
    </div>
  );
};

export default GoogleLogo;
