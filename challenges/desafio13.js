db.trips.aggregate([{
    $match: {
      $and: [{
          $expr: {
            $eq: [{
              $year: "$startTime"
            }, 2016]
          }
        },
        {
          $expr: {
            $eq: [{
              $month: "$startTime"
            }, 3]
          }
        },
        {
          $expr: {
            $eq: [{
              $dayOfMonth: "$startTime"
            }, 10]
          }
        }
      ]
    }
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: {
          $divide: [{
            $subtract: ["$stopTime", "$startTime"]
          }, 60 * 1000]
        }
      }
    }
  },
  {
    $project: {
      _id: false,
      duracaoMediaEmMinutos: {
        $ceil: ["$duracaoMediaEmMinutos"]
      }
    }
  }
]);
