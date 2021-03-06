package main

import (
	"bytes"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"
	"text/template"

	"github.com/BurntSushi/toml"
	"github.com/kaneshin/genex"
	"github.com/serenize/snaker"
)

var (
	pkg     = flag.String("pkg", "", "Package name to use in the generated code. (default \"main\")")
	srcDir  = flag.String("path", "", "output file directory")
	confDir = flag.String("dir", "", "Existing config file file directory")
	output  = flag.String("output", "", "output file name; default srcdir/config_gen.go")
)

const (
	NAME   = "config"
	OUTPUT = "config_gen.go"
)

// Usage is a replacement usage function for the flags package.
func Usage() {
	fmt.Fprintf(os.Stderr, "Usage of %s:\n", os.Args[0])
	flag.PrintDefaults()
}

func main() {
	log.SetFlags(0)
	log.SetPrefix(fmt.Sprintf("gen-%s: ", NAME))
	flag.Usage = Usage
	flag.Parse()
	if len(*pkg) == 0 {
		*pkg = "main"
	}

	// We accept either one directory or a list of files. Which do we have?
	args := flag.Args()
	if len(args) == 0 {
		flag.Usage()
		os.Exit(3)
	}

	if len(*srcDir) > 0 {
		if d, err := filepath.Abs(*srcDir); err == nil {
			*srcDir = d
		}
	}

	if len(*srcDir) == 0 {
		*srcDir = filepath.Dir(os.Args[0])
	}

	os.Exit(run())
}

func run() int {
	var (
		args = flag.Args()
		g    genex.Generator
	)

	// Print the header and package clause.
	g.Printf("// Code generated by gen-config.\n")
	// Run generate for each type.
	filename := []string{}
	config := map[string]interface{}{}
	for _, fp := range genex.MustParseGlobs(args[:]) {
		if strings.HasSuffix(fp, ".tml") {
			if _, err := toml.DecodeFile(fp, &config); err == nil {
				g.Printf("// %s\n", fp)
				filename = append(filename, fp)
			}
		}
	}
	g.Printf("// DO NOT EDIT\n")
	g.Printf("\npackage %s\n", *pkg)

	// Generate two source files.
	params := map[string]interface{}{}
	params["ConfigDir"] = *confDir
	params["TypeBody"] = printer(config)
	params["Filename"] = func() (ret []string) {
		for _, v := range filename {
			ret = append(ret, strings.Replace(v, *confDir+"/", "", -1))
		}
		return
	}()
	params["StructName"] = func(cfg map[string]interface{}) (ret []map[string]string) {
		for k, _ := range cfg {
			elm := map[string]string{}
			elm["Struct"] = snaker.SnakeToCamel(k)
			elm["Tag"] = fmt.Sprintf("`toml:\"%s\"`", k)
			ret = append(ret, elm)
		}
		return
	}(config)

	// Format the output.
	t := template.Must(template.New("").Parse(text))
	var buf bytes.Buffer
	t.Execute(&buf, params)
	g.Printf("%s", buf.String())
	src := g.Format()

	// Write to file.
	outputName := *output
	if outputName == "" {
		baseName := OUTPUT
		outputName = filepath.Join(*srcDir, strings.ToLower(baseName))
	}
	err := ioutil.WriteFile(outputName, src, 0644)
	if err != nil {
		log.Fatalf("writing output: %s", err)
	}

	return 0
}

func printer(cfg map[string]interface{}) (dst string) {
	for k, v := range cfg {
		switch v.(type) {
		case int64:
			dst += fmt.Sprintf("    %s int `toml:\"%s\"`\n", snaker.SnakeToCamel(k), k)
		case string:
			dst += fmt.Sprintf("    %s string `toml:\"%s\"`\n", snaker.SnakeToCamel(k), k)
		case bool:
			dst += fmt.Sprintf("    %s bool `toml:\"%s\"`\n", snaker.SnakeToCamel(k), k)
		case []map[string]interface{}:
			vv := v.([]map[string]interface{})
			if len(vv) > 0 {
				dst += fmt.Sprintf("  %s []struct {\n", snaker.SnakeToCamel(k))
				dst += printer(vv[0])
				dst += fmt.Sprintf("  }\n")
			}
		case map[string]interface{}:
			dst += fmt.Sprintf("  %s struct {\n", snaker.SnakeToCamel(k))
			dst += printer(v.(map[string]interface{}))
			dst += fmt.Sprintf("  }\n")
		default:
			panic(fmt.Sprintf("Unknown type: %T", v))
		}
	}
	return
}

const text = `
import (
	"strings"
	"path/filepath"

	"github.com/BurntSushi/toml"

	"github.com/gophergala2016/source/core/foundation"
)

type (
{{.TypeBody}}
	ConfigData struct {
		Mode string
{{range .StructName}}
{{.Struct}} {{.Struct}} {{.Tag}}{{end}}
	}
)

const configDir = "{{.ConfigDir}}"

var config ConfigData = ConfigData{}

func init() {
	Load()
}

func Get() ConfigData {
	return config
}

func Load() {
	mode := foundation.Mode()
	names := []string{ {{range .Filename}}
"{{.}}",{{end}}
	}
	for _, name := range names {
		dir, _ := filepath.Split(name)
		if len(dir) > 0 && !strings.HasPrefix(dir, mode) {
			continue
		}
		b := MustAsset(filepath.Join(configDir, name))
		err := config.Unmarshal(b)
		if err != nil {
			panic(err)
		}
		foundation.Printf("Load Config File: %s", name)
	}
	config.Mode = mode
}

func (c *ConfigData) Unmarshal(b []byte) error {
	return toml.Unmarshal(b, c)
}

{{range .StructName}}
func Get{{.Struct}}() {{.Struct}} {
	return Get().{{.Struct}}
}
{{end}}
`
