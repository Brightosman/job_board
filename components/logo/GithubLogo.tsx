"use client";
import { useTheme } from 'next-themes';
import Image from 'next/image';
import GitHub_light from '@/public/Github_light.svg'
import GitHub_dark from '@/public/Github_dark.svg'

const GitHubLogo = () => {
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <div>
      {isDark ? (
        <Image
          src= {GitHub_dark} //"../public/Github_dark.svg" // Path to your dark theme logo
          alt="Dark Theme Logo"
          width={20}
          height={20}
        />
      ) : (
        <Image
          src= {GitHub_light} //"./public/Github_light.svg" // Path to your light theme logo
          alt="Light Theme Logo"
          width={20}
          height={20}
        />
      )}
    </div>
  );
};

export default GitHubLogo;
