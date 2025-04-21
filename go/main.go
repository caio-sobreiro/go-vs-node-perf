package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", handleRequest)
	fmt.Println("Server is running on port 3000")
	http.ListenAndServe(":3000", nil)
}

func handleRequest(w http.ResponseWriter, r *http.Request) {
	cpuIntensiveTask()
	w.Write([]byte("Hello, World!"))
}

func cpuIntensiveTask() int {
	sum := 0
	for i := 0; i < 1e9; i++ {
		sum += i
	}
	return sum
}
