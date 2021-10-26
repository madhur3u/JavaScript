let n = 100
let x = 1
while (x <= n) {

    let count = 0
    for (let i = 2; i * i <= x; i++) {
        if (x % i == 0) {
            count = 1
            break
        }
    }
    if (count == 0) {
        console.log(x,'IS PRIME')
    } 
    x++
}
