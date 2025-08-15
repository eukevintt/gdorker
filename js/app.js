const state = {
    base: '',
    blocks: []
};

const $ = (select) => document.querySelector(select);
const chips = $('#chips');
const preview = $('#preview');
const warning = $('#warning');
const hint = $('#hint');

const hints = {
    exactPhrase: 'Envolve o valor entre aspas para buscar a frase exata.',
    or: 'Use "OR" para combinar termos, como "login OR senha".',
    excludeTerm: 'Use "-" para excluir termos, como "-senha".',
    //wildcard: 'Use "*" como coringa, como "log*".',
    //around: 'Use "AROUND" para buscar palavras próximas, como "login AROUND(3) senha".',
    siteSearch: 'Use "site:" para buscar em um site específico, como "site:exemplo.com".',
    excludeSite: 'Use "-site:" para excluir um site, como "-site:exemplo.com".',
    inurl: 'Busca termos na URL com "inurl:", como "inurl:login".',
    allinurl: 'Busca todos os termos na URL com "allinurl:", como "allinurl:login".',
    intitle: 'Busca termos no título com "intitle:", como "intitle:login".',
    allintitle: 'Busca todos os termos no título com "allintitle:", como "allintitle:login".',
    intext: 'Busca termos no corpo do texto com "intext:", como "intext:login".',
    allintext: 'Busca todos os termos no corpo do texto com "allintext:", como "allintext:login".',
    filetype: 'Busca por tipo de arquivo com "filetype:", como "filetype:pdf".',
    after: 'Formato: YYYY-MM-DD',
    before: 'Formato: YYYY-MM-DD',
    groupFiletype: 'Combina tipos de arquivo com "OR", como "pdf OR docx".',
    cache: 'Busca por conteúdo em cache com "cache:", como "cache:exemplo.com".',
    related: 'Busca por sites relacionados com "related:", como "related:exemplo.com".',
    define: 'Busca definições com "define:", como "define:exemplo".',
    source: 'Busca por fontes com "source:", como "source:exemplo.com".',
    location: 'Busca por localização com "location:", como "location:Brasil".'
};

$('#blockType').addEventListener('change', e => {
    const type = e.target.value;
    hint.textContent = hints[type] || '';
});

$('#btnAddNow').addEventListener('click', () => {
    const type = $('#blockType').value;
    const value = $('#blockValue').value.trim();
    if (!value && !['after', 'before'].includes(type)) return;

    if((type === 'after' || type === 'before') && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return alert('Formato de data inválido. Use YYYY-MM-DD ou "YYYY-MM-DD" ou "YYYY".');
    }

    state.blocks.push({ type, value });
    $('#blockValue').value = '';
});

$('#baseTerm').addEventListener('input', e => {
    state.base = e.target.value.trim();
    render();
});

