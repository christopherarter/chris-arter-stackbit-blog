export default {
    getPostSchema(post)
    {

    },

    getAuthorSchema(author)
    {

    },

    getPageSchema(page)
    {

    },

    getMarkup(object)
    {
        return `<script type="ld+json">${JSON.stringify(object)}</script>`;
    }
}