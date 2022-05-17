const FIREBASE_URL = "Firebase_URL";

//---------------------------------------- -------------------------------------------------//

export async function authenticateAccount(requestData) {
  let url;
  if (requestData.loginMode) {
    url = "Firebase_URL";
  } else {
    url = "Firebase_URL";
  }

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      email: requestData.emailData,
      password: requestData.passwordData,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message);
  }

  return {
    idToken: data.idToken,
    expiresIn: data.expiresIn,
    userID: data.localId,
  };
}
//---------------------------------------- -------------------------------------------------//
export async function addUser(requestData) {
  const response = await fetch(
    `${FIREBASE_URL}/users/${requestData.userId}.json`,
    {
      method: "POST",
      body: JSON.stringify(requestData.userData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create User.");
  }

  return { nick: requestData.userData.nick };
}

//---------------------------------------- -------------------------------------------------//

export async function changeAccountData(requestData) {
  let requestBody;
  if (requestData.emailMode) {
    requestBody = {
      idToken: requestData.idToken,
      email: requestData.emailData,
      returnSecureToken: false,
    };
  } else {
    requestBody = {
      idToken: requestData.idToken,
      password: requestData.passwordData,
      returnSecureToken: false,
    };
  }
  const response = await fetch("Firebase_URL", {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message);
  }

  return data;
}

//---------------------------------------- -------------------------------------------------//

export async function getUser(userId) {
  if (userId === "") {
    return null;
  }

  const response = await fetch(`${FIREBASE_URL}/users/${userId}.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get comments.");
  }

  const userData = [];

  for (const key in data) {
    const userObject = {
      collectionId: key,
      ...data[key],
    };

    userData.push(userObject);
  }

  const loadedUser = {
    id: userId,
    ...userData[0],
  };

  return loadedUser;
}

//---------------------------------------- -------------------------------------------------//

export async function updateUser(requestData) {
  const response = await fetch(
    `${FIREBASE_URL}/users/${requestData.userId}/${requestData.collectionId}.json`,
    {
      method: "PATCH",
      body: JSON.stringify(requestData.userData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create User.");
  }

  return true;
}

//---------------------------------------- -------------------------------------------------//

export async function getAllQuotes() {
  const response = await fetch(`${FIREBASE_URL}/quotes.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  const transformedQuotes = [];

  for (const key in data) {
    const quoteObj = {
      id: key,
      ...data[key],
    };

    transformedQuotes.push(quoteObj);
  }

  return transformedQuotes;
}

//---------------------------------------- -------------------------------------------------//

export async function getSingleQuote(quoteId) {
  const response = await fetch(`${FIREBASE_URL}/quotes/${quoteId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quote.");
  }

  const loadedQuote = {
    id: quoteId,
    ...data,
  };

  return loadedQuote;
}

//---------------------------------------- -------------------------------------------------//

export async function getAllComments(quoteId) {
  const response = await fetch(`${FIREBASE_URL}/comments/${quoteId}.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get comments.");
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };

    transformedComments.push(commentObj);
  }

  return transformedComments;
}

//---------------------------------------- -------------------------------------------------//

export async function addComment(requestData) {
  const response = await fetch(
    `${FIREBASE_URL}/comments/${requestData.quoteId}.json`,
    {
      method: "POST",
      body: JSON.stringify(requestData.commentData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not add comment.");
  }

  return { commentId: data.name };
}

//---------------------------------------- -------------------------------------------------//

export async function addQuote(quoteData) {
  const response = await fetch(`${FIREBASE_URL}/quotes.json`, {
    method: "POST",
    body: JSON.stringify(quoteData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create quote.");
  }

  return data;
}

//---------------------------------------- -------------------------------------------------//

export async function editQuote(requestData) {
  let request;

  if (requestData.editMode) {
    request = {
      method: "PATCH",
      body: JSON.stringify(requestData.quoteData),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } else {
    request = {
      method: "DELETE",
      body: JSON.stringify(requestData.quoteData),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  const response = await fetch(
    `${FIREBASE_URL}/quotes/${requestData.quoteId}.json`,
    request
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not edit the quote.");
  }

  return true;
}

//---------------------------------------- -------------------------------------------------//

export async function editComment(requestData) {
  let request;

  if (requestData.editMode) {
    request = {
      method: "PATCH",
      body: JSON.stringify(requestData.commentData),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } else {
    request = {
      method: "DELETE",
      body: JSON.stringify(requestData.commentData),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  const response = await fetch(
    `${FIREBASE_URL}/comments/${requestData.quoteId}/${requestData.commentId}.json`,
    request
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || " Could not edit the comment.");
  }

  return true;
}
