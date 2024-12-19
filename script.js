$(document).ready(function() {
    let articles = [];

    // Function to render articles
    function renderArticles(filter = '') {
        $('#articles-list').empty();
        articles.forEach((article, index) => {
            if (article.title.toLowerCase().includes(filter.toLowerCase()) || 
                article.content.toLowerCase().includes(filter.toLowerCase())) {
                $('#articles-list').append(`
                    <div class="article" data-index="${index}">
                        <h3>${article.title}</h3>
                        <p>${article.content}</p>
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                    </div>
                `);
            }
        });
    }

    // Add or edit article
    $('#article-form').on('submit', function(e) {
        e.preventDefault();
        const title = $('#article-title').val();
        const content = $('#article-content').val();
        const id = $('#article-id').val();

        if (id) {
            // Edit existing article
            articles[id] = { title, content };
        } else {
            // Add new article
            articles.push({ title, content });
        }

        // Reset form
        $('#article-form')[0].reset();
        $('#article-id').val('');
        renderArticles();
    });

    // Edit article
    $('#articles-list').on('click', '.edit', function() {
        const index = $(this).parent().data('index');
        $('#article-title').val(articles[index].title);
        $('#article-content').val(articles[index].content);
        $('#article-id').val(index);
    });

    // Delete article
    $('#articles-list').on('click', '.delete', function() {
        const index = $(this).parent().data('index');
        articles.splice(index, 1);
        renderArticles();
    });

    // Search articles
    $('#search').on('input', function() {
        const filter = $(this).val();
        renderArticles(filter);
    });
});