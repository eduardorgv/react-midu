const CAT_ENDPOINT_RANDOM_CAT = "https://catfact.ninja/fact";

export const getRandomFact = async() => {
    const res = await fetch(CAT_ENDPOINT_RANDOM_CAT)
    const data = await res.json()
    const { fact } = data
    return fact
}