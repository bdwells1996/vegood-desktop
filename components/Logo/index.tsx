import Image from 'next/image';
import logoImage from './assets/images/logo-image.svg';
import logoText from './assets/images/logo-text.svg';

interface LogoProps {
  hideText?: boolean;
}

export default function Logo({ hideText = false }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <Image src={logoImage} alt="Vegood logo" />
      {!hideText && <Image src={logoText} alt="Vegood" />}
    </div>
  );
}
