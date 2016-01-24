package main

import (
	"bufio"
	"bytes"
	"fmt"
	"io/ioutil"
	"os"
	"strconv"
	"strings"
)

func main() {
	file, err := os.Open("tag.txt")
	if err != nil {
		fmt.Printf("File error: %v\n", err)
		os.Exit(1)
	}
	defer file.Close()

	queries := bytes.NewBuffer(make([]byte, 0))
	insertQuery := "INSERT INTO tag (name,color,score,created_at,updated_at) VALUES('%s','%s', %d, now(), now());\n"
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		info := strings.Split(scanner.Text(), ":")
		score, err := strconv.Atoi(strings.TrimSpace(info[2]))
		if err != nil {
			fmt.Printf("Atoi error: %v\n", err)
			continue
		}
		insertTagQuery := fmt.Sprintf(
			insertQuery,
			strings.TrimSpace(info[0]),
			strings.TrimSpace(info[1]),
			score,
		)
		queries.WriteString(insertTagQuery)
	}
	if err := scanner.Err(); err != nil {
		fmt.Printf("Scann error: %v\n", err)
		os.Exit(1)
	}
	if err := ioutil.WriteFile("insert_tags.sql", queries.Bytes(), os.ModePerm); err != nil {
		fmt.Printf("Write error: %v\n", err)
		os.Exit(1)
	}
}
