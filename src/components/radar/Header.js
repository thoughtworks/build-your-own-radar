
const Header = ({ categories, selectedCategory }) => {

    return <header>
        <div class="radar-title">
            <div class="radar-title__text">
                <img src="/images/SQLI_logo.png" class="radar-title__logo sqli-logo" />
                <h1 style="cursor: pointer;">
                    Technology Radar - SQLi ISCM</h1>
            </div>
            <div class="radar-title__logo">
            </div>
        </div>
        {
            categories.map((category, index) => {
                return <div className={"button pie-" + index + (category === selectedCategory ? " selected" : '')}>{category}</div>
            })
        }
        {/* todo: link to about page */}
        <div class="print-radar button no-capitalize">About</div>
        <div class="home-link" style="visibility: visible;">
            « Back to Radar home
        </div>
        {/* todo: filter */}
    </header>

};