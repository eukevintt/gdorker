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
    render();
});

$('#baseTerm').addEventListener('input', e => {
    state.base = e.target.value;
    render();
});

function render() {
    chips.innerHTML = '';
    state.blocks.forEach((block, index) => {
        const chip = document.createElement('span');
        chip.className = 'chip';
        chip.innerHTML = `<b>${label(block.type)}:</b> ${escapeHtml(block.value)} <button aria-label="remove">x</button>`;
        chip.querySelector('button').addEventListener('click', () => {
            state.blocks.splice(index, 1); 
            render();
        });
        chips.appendChild(chip);
    });

    const query = buildQuery();
    preview.textContent = query;

    if(query.length > 1500) {
        alert(`Aviso: sua query tem ${query.length} caracteres. O Google pode não aceitar queries muito longas.`);
    }
}

function label(type){
    return ({
        exactPhrase: 'Frase exata',
        or: 'OU',
        excludeTerm: 'Excluir termo',
        wildcard: 'Coringa',
        around: 'Palavras próximas',
        siteSearch: 'Site específico',
        excludeSite: 'Excluir site',
        inurl: 'Na URL',
        allinurl: 'Todos na URL',
        intitle: 'No título',
        allintitle: 'Todos no título',
        intext: 'No corpo',
        allintext: 'Todos no corpo',
        filetype: 'Tipo de arquivo',
        after: 'Após data',
        before: 'Antes de data',
        groupFiletype: 'Grupo de arquivos',
        cache: 'Cache',
        related: 'Relacionado',
        define: 'Definição',
        source: 'Fonte específica',
        location: 'Localização'
    }[type] || type);
}

function escapeHtml(value){
    return value.replace(/[&<>"']/g, m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

function warnings(msg) {
    warning.textContent = msg || '';
};

function buildQuery() {

}