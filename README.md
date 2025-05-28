# AnnotateMe

AnnotateMe is a tool for annotating Named Entities in text files, currently supporting the spaCy library. This tool allows users to input a text file, annotate entities, and export the results as JSON or JavaScript objects.

## Features

- Input a text file for entity annotation.
- Supports Named Entity Recognition (NER) with spaCy.
- Export annotated results in JSON or JavaScript format.
- User-friendly interface hosted at 🔗 [annotatemee.vercel.app](https://annotatemee.vercel.app).

## Usage

1. Open the application in your browser at 🔗 [annotatemee.vercel.app](https://annotatemee.vercel.app).
2. Upload a text file containing the entities you want to annotate.
3. Use the interface to annotate the entities.
4. Export your annotations as JSON or JavaScript objects.

## JSON Export Format

When exporting the annotated entities as JSON, the format will look like the following:

```json
{
  "text": "Barack Obama was born in Hawaii.",
  "entities": [
    {
      "start": 0,
      "end": 12,
      "label": "PERSON"
    },
    {
      "start": 25,
      "end": 31,
      "label": "GPE"
    }
  ]
}
```

## License

This project is licensed under the MIT License.

## Contributors

-[AadeshSiva](https://github.com/AadeshSiva)


