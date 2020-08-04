

const fetchArtistsFromLocal = () => {
    return ["Abhishek",
        "Swati",
        "Ravi",
        "Vijeta",
        "Sanjay",
        "Pinky"];
}

const fetchMp3sFromLocal = async (artist) => {
    let retValue = [{
        "url": "https://dusnumbaries-karaoke.s3.amazonaws.com/Abhishek%2FAbh-Rimjhim%20rimjhim.mp3",
        "name": "Abh-Rimjhim rimjhim.mp3",
        "artist": "Abhishek"
    }, {
        "url": "https://dusnumbaries-karaoke.s3.amazonaws.com/Abhishek%2FAbh-Tujhse%20Naaraz%20nahi%20jindigi.mp3",
        "name": "Abh-Tujhse Naaraz nahi jindigi.mp3",
        "artist": "Abhishek"
    }, {
        "url": "https://dusnumbaries-karaoke.s3.amazonaws.com/Abhishek%2FAbh-Tujhse%20Naaraz%20nahi%20jindigi.mp3",
        "name": "Abh-Tujhse Naaraz nahi jindigi.mp3",
        "artist": "Abhishek"
    }, {
        "url": "https://dusnumbaries-karaoke.s3.amazonaws.com/Abhishek%2FAbh-Tujhse%20Naaraz%20nahi%20jindigi.mp3",
        "name": "Abh-Tujhse Naaraz nahi jindigi.mp3",
        "artist": "Abhishek"
    }, {
        "url": "https://dusnumbaries-karaoke.s3.amazonaws.com/Abhishek%2FAbh-Tujhse%20Naaraz%20nahi%20jindigi.mp3",
        "name": "Abh-Tujhse Naaraz nahi jindigi.mp3",
        "artist": "Abhishek"
    }, {
        "url": "https://dusnumbaries-karaoke.s3.amazonaws.com/Abhishek%2FAbh-Tujhse%20Naaraz%20nahi%20jindigi.mp3",
        "name": "Abh-Tujhse Naaraz nahi jindigi.mp3",
        "artist": "Abhishek"
    }];

    if (artist.toLowerCase().startsWith("swati")) {
        retValue = [
            {
                "url": "https://dusnumbaries-karaoke.s3.amazonaws.com/Swati%2FSwati-Mausam%20hai%20Aashiquana.mp3",
                "name": "Swati-Mausam hai Aashiquana.mp3",
                "artist": "Swati"
            }, {
                "url": "https://dusnumbaries-karaoke.s3.amazonaws.com/Swati%2FSwati-Mausam%20hai%20Aashiquana.mp3",
                "name": "Swati-Mausam hai Aashiquana.mp3",
                "artist": "Swati"

            }, {
                "url": "https://dusnumbaries-karaoke.s3.amazonaws.com/Swati%2FSwati-Mausam%20hai%20Aashiquana.mp3",
                "name": "Swati-Mausam hai Aashiquana.mp3",
                "artist": "Swati"
            }
        ];
    }

    return retValue;
};

export { fetchArtistsFromLocal, fetchMp3sFromLocal };