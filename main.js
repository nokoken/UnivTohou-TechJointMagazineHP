function main()
{
    productCard();
}

function productCard()
{
    const container = document.getElementById('gallery-list');

    if (!container) return;

    fetch('./product.json')
        .then(response =>{
            if (!response.ok) throw new Error('JSON not found');
            return response.json();
        })
    .then(data => {
        data.forEach(item =>{
            let imageHTML = "";
            if (item.image && item.image !== "")
                imageHTML = `<div class="card-image"><img src="${item.image}" loading="lazy"></div>`;
            let badgeHTML = ""
            if (item.badge && item.badge !== "")
                badgeHTML = `<div class="badge ${item.category}">${item.badge}</div>`;
            const cardHTML = `
                <div class="card gallery-item">
                    ${imageHTML}
                    <div class="card-text">
                        <h3>${item.title}</h3>
                        <p class="${item.category === 'novel' ? 'novel-preview' : ''}">${item.text}</p>
                    </div>
                    ${badgeHTML}
                </div>
            `;
            container.insertAdjacentHTML('beforeend', cardHTML);
        });
    })
    .catch(error => console.error('カード生成エラー:', error));
}

addEventListener("load", main);