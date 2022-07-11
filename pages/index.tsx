import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import { CSVDocumentInput } from '../radar/util/factory';

const Home: NextPage = () => {
    // require('../radar/common');
    // require('../public/radar_legend.png');

    useEffect(() => {
        CSVDocumentInput().build();
    }, []);

    return (
        <>
            <header className="header">
                <div className="header__top">
                    <div className="header__logo">
                        <a href="https://www.amido.com">
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
            <main className="main">
                <div className="loader" id="loadingWrapper">
                    <div className="loader__title">Building the radar</div>
                    <div className="loader__wrapper">
                        <div
                            className="loader__block"
                            style={{ animationDelay: '0s' }}
                        ></div>
                        <div
                            className="loader__block"
                            style={{ animationDelay: '0.25s' }}
                        ></div>
                        <div
                            className="loader__block"
                            style={{ animationDelay: '0.75s' }}
                        ></div>
                        <div
                            className="loader__block"
                            style={{ animationDelay: '0.5s' }}
                        ></div>
                    </div>
                </div>
                <div id="radarHeader"></div>
                <div id="radar"></div>
            </main>
            <footer className="footer">
                Inspired by the{' '}
                <a href="https://www.thoughtworks.com/radar">Thoughtworks</a>{' '}
                technology radar.
            </footer>
        </>
    );
};

export default Home;
