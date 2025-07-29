document.addEventListener("DOMContentLoaded", () => {
    var filterBarData = $('#filter-bar');
    var postsGrid = $('#posts-grid');

    GetTags(filterBarData, postsGrid);
});

function GetTags(filterBarData, postsGrid) {
    fetch('./data/topics.json')
        .then(response => response.json())
        .then(data => {
            const topics = data.topics;
            filterBarData.append('<a href="" class="filter-link active" data-filter="all">All</a>');
            topics.forEach(topic => {
                const filterLink = document.createElement('a');
                filterLink.href = '';
                filterLink.className = 'filter-link';
                filterLink.dataset.filter = topic;
                filterLink.textContent = topic;
                if (topic === 'all') {
                    filterLink.classList.add('active');
                }
                filterBarData.append(filterLink);
                GetPosts(filterBarData, postsGrid);
            });
        }).catch(error => {
            ShowError(filterBarData, postsGrid);
        });
}

function ShowError(filterBarData, postsGrid) {
    filterBarData.empty();
    postsGrid.empty();

    $("#errormsg").text('Error fetching topics or posts. Please try refreshing.');
    $("#errormsg").css('display', 'block');
}
function GetPosts(filterBarData, postsGrid) {
    fetch('./data/posts.json')
        .then(response => response.json())
        .then(data => {
            if (!data.posts || data.posts.length === 0) {
                ShowError(filterBarData, postsGrid);
                return;
            }

            data.posts.sort((a, b) => {
                const partsA = a.date.split('/');
                const dateObjectA = new Date(`20${partsA[2]}`, partsA[1] - 1, partsA[0]);
                const partsB = b.date.split('/');
                const dateObjectB = new Date(`20${partsB[2]}`, partsB[1] - 1, partsB[0]);
                return dateObjectB - dateObjectA;
            });

            postsGrid.empty();
            data.posts.forEach(post => {
                const postCard = document.createElement('div');
                postCard.className = 'post-card';
                postCard.dataset.title = post.title;
                postCard.dataset.tags = post.tags.join(',');

                const metaDiv = document.createElement('div');
                metaDiv.className = 'post-card-meta animate-on-scroll-for-cards';
                metaDiv.innerHTML = `<span class="post-card-category">${post.category}</span>
                                    <span class="post-card-date">${post.date}</span>`;

                const img = document.createElement('img');
                img.className = 'post-card-image animate-on-scroll-for-cards';
                img.src = post.image;
                img.alt = `Post image for ${post.title}`;

                const contentDiv = document.createElement('div');
                contentDiv.className = 'post-card-content animate-on-scroll-for-cards';
                contentDiv.innerHTML = `<h2 class="post-card-title">${post.title}</h2>`;

                postCard.appendChild(metaDiv);
                postCard.appendChild(img);
                postCard.appendChild(contentDiv);

                postsGrid.append(postCard);
            });

            Animate();
            MakeTagsFunctional(filterBarData, postsGrid);
        }).catch(error => {
            ShowError(filterBarData, postsGrid);
        });
}
function MakeTagsFunctional(filterBarData, postsGrid) {
    filterPosts();
    filterBarData.on('click', (e) => {
        e.preventDefault();
        const target = e.target;

        if (!target.classList.contains('filter-link')) return;

        const currentActive = $('.filter-link.active');
        if (currentActive) {
            currentActive.removeClass('active');
        }
        target.classList.add('active');

        filterPosts();
    });
}
