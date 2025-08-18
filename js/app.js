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
        return warnings('Formato de data inválido. Use YYYY-MM-DD ou "YYYY-MM-DD" ou "YYYY".');
    }

    if((type === 'inurl' && state.blocks.some(b => b.type === 'allinurl')) || (type === 'allinurl' && state.blocks.some(b => b.type === 'inurl'))) {
        return warnings('Você não pode usar "inurl" com "allinurl".');
    }

    if ((type === 'intitle' && state.blocks.some(b => b.type === 'allintitle')) || (type === 'allintitle' && state.blocks.some(b => b.type === 'intitle'))) {
        return warnings('Você não pode usar "intitle" com "allintitle".');
    }

    if ((type === 'intext' && state.blocks.some(b => b.type === 'allintext')) || (type === 'allintext' && state.blocks.some(b => b.type === 'intext'))) {
        return warnings('Você não pode usar "intext" com "allintext".');
    }

    if ((type === 'groupFiletype' && state.blocks.some(b => b.type === 'filetype')) || (type === 'filetype' && state.blocks.some(b => b.type === 'groupFiletype'))) {
        return warnings('Você não pode usar "groupFiletype" com "filetype".', 'blue');
    }

    if (type === 'filetype' && state.blocks.some(b => b.type === 'filetype')) {
        return warnings('Você já adicionou um tipo de arquivo. Use "groupFiletype" para combinar vários tipos.', 'blue');
    }

    state.blocks.push({ type, value });
    $('#blockValue').value = '';
    render();
});

$('#baseTerm').addEventListener('input', e => {
    state.base = e.target.value.trim();
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
        warnings(`Aviso: sua query tem ${query.length} caracteres. O Google pode não aceitar queries muito longas.`);
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

function warnings(msg, color = 'red') {
    warning.textContent = msg || '';
    warning.style.display = msg ? 'block' : 'none';
    warning.style.borderRadius = '10px';
    warning.style.padding = '10px';
    warning.style.margin = '10px 0';
    warning.style.fontSize = '14px';
    warning.style.fontWeight = 'bold';

    if (color === 'red') {
        warning.style.backgroundColor = '#d611119a';
        warning.style.color = 'black';
    } else if (color === 'green') {
        warning.style.backgroundColor = '#22d6119a';
        warning.style.color = 'black';
    } else if (color === 'blue') {
        warning.style.backgroundColor = '#2195f3b0';
        warning.style.color = 'white';
    }
    
};

function wrapIfSpace(value) {
    return /\s/.test(value) ? `"${value}"` : value;
}

function quoteIfNeeded(value) {
    return /[^A-Za-z0-9._:-]/.test(value) ? `"${value}"` : value;
}

function buildQuery() {
    const parts = [];

    if (state.base) parts.push(state.base);

    const isAllInText = state.blocks.some(block => block.type === 'allintext');
    const isAllInUrl = state.blocks.some(block => block.type === 'allinurl');
    const isAllInTitle = state.blocks.some(block => block.type === 'allintitle');

    state.blocks.filter(block => block.type === 'or').forEach(block => {
        const items = block.value.split(';').map(item => item.trim()).filter(Boolean);
        if (items.length >= 2) parts.push(`(${items.map(quoteIfNeeded).join(' OR ')})`);
        else if (items.length === 1) parts.push(quoteIfNeeded(items[0]));
    });

    state.blocks.filter(block => block.type === 'groupFiletype').forEach(block => {
        const items = block.value.split(';').map(item => item.trim().replace(/^\./,'')).filter(Boolean);

        if (items.length >= 2) {
            parts.push(`(${items.map(e=>`filetype:${e}`).join(' OR ')})`);
        } else if (items.length===1) {
            parts.push(`filetype:${items[0]}`);
        }
    });

    //Tratar wildcard e around futuramente

    state.blocks.forEach(block => {
        if (block.type === 'or' || block.type === 'groupFiletype') return;

        switch (block.type) {
            case 'exactPhrase':
                parts.push(`"${block.value}"`);
                break;
            case 'excludeTerm':
                parts.push(`-${wrapIfSpace(block.value)}`);
                break;
            case 'siteSearch':
                parts.push(`site:${block.value}`)
                break;
            case 'excludeSite':
                parts.push(`-site:${block.value}`);
                break;
            case 'inurl':
                if (!isAllInUrl) parts.push(`inurl:${wrapIfSpace(block.value)}`);
                break;
            case 'allinurl':
                parts.push(`allinurl:${block.value}`);
                break;
            case 'intitle':
                if (!isAllInTitle) parts.push(`intitle:${wrapIfSpace(block.value)}`);
                break;
            case 'allintitle':
                parts.push(`allintitle:${block.value}`);
                break;
            case 'intext':
                if (!isAllInText) parts.push(`intext:${wrapIfSpace(block.value)}`);
                break;
            case 'allintext':
                parts.push(`allintext:${block.value}`);
                break;
            case 'filetype':
                parts.push(`filetype:${block.value.replace(/^\./,'')}`);
                break;
            case 'after':
                parts.push(`after:${block.value}`);
                break;
            case 'before':
                parts.push(`before:${block.value}`);
                break;
            case 'cache':
                parts.push(`cache:${block.value}`);
                break;
            case 'related':
                parts.push(`related:${block.value}`);
                break;
            case 'define':
                parts.push(`define:${block.value}`);
                break;
            case 'source':
                parts.push(`source:${block.value}`);
                break;
            case 'location':
                parts.push(`location:${block.value}`);
                break;
        }
    });

    return parts.filter(Boolean).join(' ').trim();
}

$('#btnGenerate').addEventListener('click', () => {
    const query = buildQuery();

    if(!query) return warnings('Adicione ao menos um termo de busca.');

    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener');
});

$('#btnCopy').addEventListener('click', async () => {
    const query = buildQuery();

    if(!query) return warnings('Adicione ao menos um termo de busca.');

    try {
        await navigator.clipboard.writeText(query);
        warnings('Dork copiada!', 'green');
        setTimeout(()=>warning(''),1500);
    } catch {
        warnings('Erro ao copiar a dork. Tente novamente.');
    }
});

render();