class KaterynaPromise {
    #result;
    constructor(executor) {
        this.state = 'pending'

        try {
            executor.call(null, this.resolve.bind(this), this.reject.bind(this))
        } catch(error) {
            this.reject(error)
        }
    }

    resolve(data) {
        this.state = 'fulfilled'
        this.#result = data
        return this
    }

    reject(reason) {
        this.state = 'rejected'
        this.#result = reason instanceof Error ? reason : new Error(reason)
    }

    then(onFulfilled, onRejected) {
        if (onFulfilled !== null && this.state === 'fulfilled') {
            onFulfilled(this.#result)
        }

        if (onRejected && this.state === 'rejected') {
            onRejected(this.#result)
        }
        return this
    }

    catch(onRejected) {
        onRejected(this.#result)
        return this
    }

    finally(onFinal) {
        onFinal()
        return this
    }
}

const promise = new KaterynaPromise((resolve, reject) => {
    const number = setTimeout(() => 1, 3000)
    throw new Error("o_O");
    resolve(number + 1)
})

promise
.then(res => {
    res += 1
    console.log(res)
},
err => console.log(err))
.finally(() => {
    setTimeout(() => console.log('the end'), 1000)
})


// const nativePromise = new Promise((resolve, reject) => {
//     const number = setTimeout(() => 1, 3000)
//     reject(new Error('fffffail'))
//     resolve(number + 1)
// })
// .then(res => {
//     res += 1
//     console.log(res)
// })
// .catch(reason => console.log(reason))