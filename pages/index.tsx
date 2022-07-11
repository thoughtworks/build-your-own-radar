import type { NextPage } from 'next';
import { useEffect } from 'react';

import { Footer, Header } from '../components';
import { CSVDocumentInput } from '../radar/util/factory';

const Home: NextPage = () => {
    useEffect(() => {
        CSVDocumentInput().build();
    }, []);

    return (
        <div className="page">
            <Header />
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
            </main>
            <Footer />
        </div>
    );
};

export default Home;
