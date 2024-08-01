const languageCodeMap = {
      cpp: 54,
      java: 91,
      python: 92,
      javascript: 93
    }
    
    const getSubmission = async (tokenId) => {
      const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'c15e205f6dmshcd0d4a41a06c996p1be762jsn55f802383132',
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
      };
    
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json()
        return result;
      } catch (error) {
        console.error("Error fetching submission:", error);
        throw new Error(JSON.stringify(error));
      }
    }
    
    export const makeSubmission = async ({ code, language, callback, stdin }) => {
      const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*';
      const httpOptions = {
        method: 'POST',
        headers: {
          'x-rapidapi-key': 'c15e205f6dmshcd0d4a41a06c996p1be762jsn55f802383132',
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          language_id: languageCodeMap[language],
          source_code: btoa(code),
          stdin: btoa(stdin)
        })
      };
    
      try {
        callback({ apiStatus: "loading" });
        const response = await fetch(url, httpOptions);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        const tokenId = result.token;
        if (!tokenId) {
          throw new Error("Token ID is missing in the response");
        }
    
        let statusCode = 1;
        let apiSubmissionResult;
    
        while (statusCode === 1 || statusCode === 2) {
          try {
            apiSubmissionResult = await getSubmission(tokenId);
            statusCode = apiSubmissionResult.status.id;
          } catch (error) {
            callback({
              apiStatus: "error",
              message: JSON.stringify(error)
            });
            return;
          }
        }
    
        callback({ apiStatus: "success", data: apiSubmissionResult });
    
      } catch (error) {
        callback({
          apiStatus: "error",
          message: JSON.stringify(error)
        });
      }
    }
    