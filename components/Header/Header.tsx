import Image from 'next/image';
import Link from 'next/link';

export function Header() {
    return (
        <header className="header">
            <div className="header__top">
                <div className="header__logo">
                    <a
                        href="https://www.amido.com"
                        className="header__home-link"
                    >
                        <Image
                            src="/amido-logo.svg"
                            alt="Amido logo"
                            className="logo"
                            width="112"
                            height="47"
                        />
                    </a>
                </div>
                <nav className="menu">
                    <ul className="menu__list">
                        <li className="menu__item">
                            <Link href="/">Home</Link>
                        </li>
                        <li className="menu__item">
                            <Link href="/about">About This Radar</Link>
                        </li>
                        <li className="menu__item">
                            <Link href="/historic">Historic Blips</Link>
                        </li>
                        <li className="menu__item">
                            <Link href="/stacks">Stacks</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="hero-banner">
                <div className="hero-banner__wrapper">
                    <h1>Interfaces & Devices - Technology Radar</h1>
                </div>
            </div>
        </header>
    );
}
