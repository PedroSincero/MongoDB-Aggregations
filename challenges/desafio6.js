db.movies.aggregate([{
  $match: {
    awards: {
      $exists: true,
      $regex: /won [0-9]+ oscar/i,
    },
  },
},
{
  $group: {
    _id: null,
    maior_rating: {
      $max: "$imdb.rating",
    },
    menor_rating: {
      $min: "$imdb.rating",
    },
    media_rating: {
      $avg: "$imdb.rating",
    },
    desvio_padrao: {
      $stdDevSamp: "$imdb.rating",
    },
  },
},
{
  $project: {
    _id: false,
    maior_rating: true,
    menor_rating: true,
    media_rating: {
      $round: ["$media_rating", 1],
    },
    desvio_padrao: {
      $round: ["$desvio_padrao", 1],
    },
  },
},
]);

// Agradecimendos a Leandro Reis Turma 10 - Tribo B, pelo auxilio no regex
