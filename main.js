const EPSILON = Math.sqrt(Number.EPSILON); 

function findExtrema(f, lim_a, lim_b) {
    let iters = 0;

    if (lim_a > lim_b) {
        [lim_a, lim_b] = [lim_b, lim_a];
    } else if (Math.abs(lim_a - lim_b) <= EPSILON) {
        console.error("Search range must be greater than " + EPSILON);
        return lim_a;
    }

    const M_GOLDEN_RATIO = (3 - Math.sqrt(5)) / 2;

    let v = lim_a + M_GOLDEN_RATIO * (lim_b - lim_a);
    let u, w = v, x = v;
    let fu, fv = f(v);
    let fw = fv, fx = fv;

    let mid_point = (lim_a + lim_b) / 2;
    let p = 0, q = 0, r = 0;

    let d, e = 0;
    let tolerance, tolerance2;

    do {
        mid_point = (lim_a + lim_b) / 2;
        tolerance = EPSILON * Math.abs(x);
        tolerance2 = 2 * tolerance;

        if (Math.abs(e) > tolerance2) {
            r = (x - w) * (fx - fv);
            q = (x - v) * (fx - fw);
            p = (x - v) * q - (x - w) * r;
            q = 2 * (q - r);
            if (q > 0)
                p = -p;
            else
                q = -q;
            r = e;
            e = d;
        }

        if (Math.abs(p) < Math.abs(0.5 * q * r) && p < q * (lim_b - x)) {
            d = p / q;
            u = x + d;
            if (u - lim_a < tolerance2 || lim_b - u < tolerance2)
                d = x < mid_point ? tolerance : -tolerance;
        } else {
            e = (x < mid_point ? lim_b : lim_a) - x;
            d = M_GOLDEN_RATIO * e;
        }

        if (Math.abs(d) >= tolerance)
            u = d;
        else if (d > 0)
            u = tolerance;
        else
            u = -tolerance;
        u += x;
        fu = f(u);

        if (fu <= fx) {
            if (u < x)
                lim_b = x;
            else
                lim_a = x;
            v = w;
            fv = fw;
            w = x;
            fw = fx;
            x = u;
            fx = fu;
        } else {
            if (u < x)
                lim_a = u;
            else
                lim_b = u;
            if (fu <= fw || x === w) {
                v = w;
                fv = fw;
                w = u;
                fw = fu;
            } else if (fu <= fv || v === x || v === w) {
                v = u;
                fv = fu;
            }
        }

        iters++;
    } while (Math.abs(x - mid_point) > (tolerance - (lim_b - lim_a) / 2));

    console.log(" (iters: " + iters + ") ");

    return x;
}


function test1() {
    const f1 = x => (x - 2) * (x - 2);
    console.log("Test 1.... ");
    const minima = findExtrema(f1, -1, 5);
    console.log(minima + "...");
    if (Math.abs(minima - 2) < EPSILON)
        console.log("passed");
    else
        console.error("failed");
}

function test2() {
    const func = x => -Math.pow(x, 1 / x);
    console.log("Test 2.... ");
    const minima = findExtrema(func, -2, 5);
    console.log(minima + " (" + Math.E + ")...");
    if (Math.abs(minima - Math.E) < EPSILON)
        console.log("passed");
    else
        console.error("failed");
}

function test3() {
    const func = x => Math.cos(x);
    console.log("Test 3.... ");
    const minima = findExtrema(func, -4, 12);
    console.log(minima + " (" + Math.PI + ")...");
    if (Math.abs(minima - Math.PI) < EPSILON)
        console.log("passed");
    else
        console.error("failed");
}

console.log("Computations performed with machine epsilon: " + EPSILON);
test1();
test2();
test3();
