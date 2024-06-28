async function translate(text, from, to, options) {
    const { utils } = options;
    const { tauriFetch: fetch } = utils;
    const res = await fetch(`https://tatoeba.org/eng/api_v0/search`, {
        method: 'GET',
        query:
        {
            "query": text,
            "from": from,
            "to": to,
            "has_audio": "no",
            "sort": "relevance"
        }
    });

    if (res.ok) {
        let result = res.data;
        let final = { "sentence": [] };
        const { results } = result;
        for (let i of results) {
            let source = i.text;
            let target = "";
            let translations = o.translations;
            for (let j in translations) {
                for (let k in j) {
                    target.push(k.text);
                    target.push("\n");
                }
            }
            let sentence = { "source": source, "target": target };
            final.sentence.push(sentence);
        }
        return final;
    } else {
        throw `Http Request Error\nHttp Status: ${res.status}\n${JSON.stringify(res.data)}`;
    }
}
