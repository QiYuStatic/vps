function on_compare_input_key_down(event) {
    if (event.keyCode === 13) {
        goto_do_compare_job();
    }
}

function goto_do_compare_job() {
    let a = document.getElementById("this_job_id");
    let b = document.getElementById("that_job_id");
    if (typeof a.value !== typeof "" || typeof b.value !== typeof "") {
        return;
    }
    if (a.value === "" || b.value === "") {
        return;
    }
    if (a.value.length !== b.value.length) {
        return;
    }
    if (a.value === b.value) {
        return;
    }
    window.location.href = `/bench/compare/${a.value}/${b.value}`;
}
