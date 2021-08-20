db.trips.aggregate([{
  $addFields: {
    duracao: {
      $subtract: ["$stopTime", "$startTime"],
    },
    bikeId: "$bikeid",
  },
},
{
  $group: {
    _id: "$bikeId",
    duracaoMedia: {
      $avg: {
        $divide: [
          "$duracao",
          60 * 1000,
        ],
      },
    },
  },
},
{
  $sort: {
    duracaoMedia: -1,
  },
},
{
  $limit: 5,
},
{
  $project: {
    bikeId: "$_id",
    duracaoMedia: {
      $ceil: "$duracaoMedia",
    },
    _id: false,
  },
},
]);

// Agradecimentos a -- denis rossanti Turma 10 tribo B - pela explicação Tecnica
