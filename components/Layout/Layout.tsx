import { Footer } from '../Footer';
import { Header } from '../Header';
import { LayoutProperties } from './Layout.types';

export function Layout({ children }: LayoutProperties) {
    return (
        <div className="page">
            <Header />
            <main className="main">{children}</main>
            <Footer />
        </div>
    );
}
