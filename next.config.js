const fetch = require('isomorphic-unfetch');

module.exports = {
  exportPathMap: async function() {
    const paths = {
      '/': { page: '/' },
      '/about': { page: '/about' }
    };
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
    const data = await res.json();
    // On génére toutes les fiches articles sauf l'id 33618 (les aventures de Batman)
    const shows = data.map(entry => entry.show).filter(show => show.id !== 33618);

    shows.forEach(show => {
      paths[`/show/${show.id}`] = { page: '/show/[id]', query: { id: show.id } };
    });

    return paths;
  }
};

