db.trips.aggregate([{
    $addFields: {
      days: {
        $dayOfWeek: "$startTime"
      }
    }
  },
  {
    $group: {
      _id: {
        dia_semana: "$days",
        estacao: "$startStationName"
      },
      total: {
        $sum: 1
      },
    }
  },
  {
    $sort: {
      total: -1
    }
  },
  {
    $limit: 1
  },
  {
    $project: {
      nomeEstacao: "$_id.estacao",
      total: "$total",
      _id: false
    }
  }
]);

// Agradecimentos a -- Leandro Reis Turma 10 tribo B - pela explicação dos _id