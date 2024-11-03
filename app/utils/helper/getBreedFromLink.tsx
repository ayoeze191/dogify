export default function extractBreeds(url:string):string {
    // Regular expression to capture text between the last two slashes
    const regex = /\/([^\/]+)\/[^\/]+$/;

    // Map over the message array and extract breed names using the regex
   
        const match = url.match(regex)!;
        return match[1] // Return the captured breed name or null

    // Filter out any null values from the result
    // return breeds.filter(breed => breed !== null);
}

