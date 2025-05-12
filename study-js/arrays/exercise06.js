let names = [
    "Zehra",
    "Ayşegül",
    "Ali",
    "Şule",
    "Şima",
    "Sema"
]
console.log(names)
names.sort()
console.log(names)
names.sort((a, b) => a.localeCompare(b,"tr"))
console.log(names)
names.sort((a, b) => b.localeCompare(a,"tr"))
console.log(names)
