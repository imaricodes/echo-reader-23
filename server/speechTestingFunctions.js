
    //TODO: where in this process do I close the api connection?
    socket.emit("close_media_recorder", "close_media_recorder")

    let sessionResult = [
        ["I", "like", "peanuts", "in", "my", "cereal."],
        ["I", "like", "peanuts", "in", "my", "cereal."],
        { cueWord: "i", responseWord: "i", match: "true", responseDisplayWord: "I" },
        {
          cueWord: "like",
          responseWord: "like",
          match: "true",
          responseDisplayWord: "like"
        },
        {
          cueWord: "peanuts",
          responseWord: "peanuts",
          match: "true",
          responseDisplayWord: "peanuts"
        },
        {
          cueWord: "in",
          responseWord: "in",
          match: "true",
          responseDisplayWord: "in"
        },
        {
          cueWord: "my",
          responseWord: "my",
          match: "true",
          responseDisplayWord: "my"
        },
        {
          cueWord: "cereal",
          responseWord: "cereal",
          match: "true",
          responseDisplayWord: "cereal."
        }
      ];

    socket.emit("results_processed", sessionResult)

