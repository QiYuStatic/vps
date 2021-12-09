function to_seq_read(a_raw) {
    return a_raw.map(function (value, index) {
        return [index + 1, value["seq"]["read"].toFixed(2)];
    });
}


function to_seq_write(a_raw) {
    return a_raw.map(function (value, index) {
        return [index + 1, value["seq"]["write"].toFixed(2)];
    });
}

function to_rand_read(a_raw) {
    return a_raw.map(function (value, index) {
        return [index + 1, value["rand"]["read"].toFixed(2)];
    });
}

function to_rand_write(a_raw) {
    return a_raw.map(function (value, index) {
        return [index + 1, value["rand"]["write"].toFixed(2)];
    });
}
