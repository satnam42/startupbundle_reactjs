const baseUrl = "http://93.188.167.68:4500/api";

export const post = async (pathname, data, successActions, errActions, netErrActions, token) => {

    const completeUrl = baseUrl + pathname
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
    }

    if (token === undefined) {

        if (successActions && typeof (successActions) === "string") {
            token = successActions;
        }

        else if (errActions && typeof (errActions) === "string") {
            token = errActions;
        }

        else if (netErrActions && typeof (netErrActions) === "string") {
            token = netErrActions;
        }
    }

    if (token && typeof (token) === "string") {
        const tokenKeyValue = {
            "x-access-token": token
        }
        headers = { ...headers, ...tokenKeyValue }
    }


    const jsonData = JSON.stringify(data)
    try {
        const response = await fetch(completeUrl, {
            method: 'POST',
            headers,
            body: jsonData
        });

        const responseObj = await response.json();

        if (responseObj.error) {

            if (errActions && typeof (errActions) === "function") {
                errActions(responseObj.error);
            }
            else {
                alert(responseObj.error);
            }

        } else if (responseObj.isSuccess === true) {

            if (successActions && typeof (successActions) === "function") {
                successActions(responseObj.data);
            }
            else {
                alert("Response is 200")
            }

        }


    }
    catch (err) {
        if (netErrActions && typeof (netErrActions) === "function") {
            netErrActions(err);
        }
        else {
            alert("Please Check Your Internet Connection")
        }
    }
}


export const get = async (pathname, successActions, errActions, netErrActions, token) => {

    const completeUrl = baseUrl + pathname
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
    }

    if (token === undefined) {

        if (successActions && typeof (successActions) === "string") {
            token = successActions;
        }

        else if (errActions && typeof (errActions) === "string") {
            token = errActions;
        }

        else if (netErrActions && typeof (netErrActions) === "string") {
            token = netErrActions;
        }
    }

    if (token && typeof (token) === "string") {
        const tokenKeyValue = {
            "x-access-token": token
        }
        headers = { ...headers, ...tokenKeyValue }
    }



    try {
        const response = await fetch(completeUrl, {
            method: 'GET',
            headers
        });

        const responseObj = await response.json();


        if (responseObj.error) {

            if (errActions && typeof (errActions) === "function") {
                errActions(responseObj.error);
            }
            else {
                alert(responseObj.error);
            }

        } else if (responseObj.isSuccess === true) {

            if (successActions && typeof (successActions) === "function") {
                if (responseObj.data) {
                    successActions(responseObj.data);
                }
                else if (responseObj.items) {
                    successActions(responseObj.items);
                }
            }
            else {
                alert("Response is 200")
            }

        }


    }
    catch (err) {
        if (netErrActions && typeof (netErrActions) === "function") {
            netErrActions(err);
        }
        else {
            alert("Please Check Your Internet Connection")
        }
    }
}




export const put = async (pathname, data, successActions, errActions, netErrActions, token) => {

    const completeUrl = baseUrl + pathname
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
    }

    if (token === undefined) {

        if (successActions && typeof (successActions) === "string") {
            token = successActions;
        }

        else if (errActions && typeof (errActions) === "string") {
            token = errActions;
        }

        else if (netErrActions && typeof (netErrActions) === "string") {
            token = netErrActions;
        }
    }

    if (token && typeof (token) === "string") {
        const tokenKeyValue = {
            "x-access-token": token
        }
        headers = { ...headers, ...tokenKeyValue }
    }


    const jsonData = JSON.stringify(data)
    try {
        const response = await fetch(completeUrl, {
            method: 'PUT',
            headers,
            body: jsonData
        });

        const responseObj = await response.json();

        if (responseObj.error) {

            if (errActions && typeof (errActions) === "function") {
                errActions(responseObj.error);
            }
            else {
                alert(responseObj.error);
            }

        } else if (responseObj.isSuccess === true) {

            if (successActions && typeof (successActions) === "function") {
                successActions(responseObj.data);
            }
            else {
                alert("Response is 200")
            }

        }


    }
    catch (err) {
        if (netErrActions && typeof (netErrActions) === "function") {
            netErrActions(err);
        }
        else {
            alert("Please Check Your Internet Connection")
        }
    }
}


export const upload = async (pathname, data, successActions, errActions, netErrActions, token) => {

    const completeUrl = baseUrl + pathname
    let headers = {
        Accept: "application/json",
        // "Content-Type": "multipart/form-data"
    }

    if (token === undefined) {

        if (successActions && typeof (successActions) === "string") {
            token = successActions;
        }

        else if (errActions && typeof (errActions) === "string") {
            token = errActions;
        }

        else if (netErrActions && typeof (netErrActions) === "string") {
            token = netErrActions;
        }
    }

    if (token && typeof (token) === "string") {
        const tokenKeyValue = {
            "x-access-token": token
        }
        headers = { ...headers, ...tokenKeyValue }
    }



    try {
        const response = await fetch(completeUrl, {
            method: 'POST',
            headers,
            body: data
        });

        const responseObj = await response.json();

        if (responseObj.error) {

            if (errActions && typeof (errActions) === "function") {
                errActions(responseObj.error);
            }
            else {
                alert(responseObj.error);
            }

        } else if (responseObj.isSuccess === true) {

            if (successActions && typeof (successActions) === "function") {
                successActions(responseObj.data);
            }
            else {
                alert("Response is 200")
            }

        }


    }
    catch (err) {
        if (netErrActions && typeof (netErrActions) === "function") {
            netErrActions(err);
        }
        else {
            alert("Please Check Your Internet Connection")
        }
    }
}
