import React, { useEffect, useRef, useState, useCallback } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

const XmlEditor = () => {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const abortControllerRef = useRef(null);
  const [xmlCode, setXmlCode] = useState(`<?xml version="1.0" encoding="UTF-8"?>
<root>
  <!-- Start typing here -->
</root>`);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    setupAutocomplete(monaco);
  };

  const setupAutocomplete = (monaco) => {
 
    if (window.xmlCompletionProvider) {
      window.xmlCompletionProvider.dispose();
    }
   
    const provider = monaco.languages.registerCompletionItemProvider("xml", {
      triggerCharacters: ["<"],
      
      provideCompletionItems: async (model, position, context, token) => {
   
        const lineContent = model.getLineContent(position.lineNumber);
        const textUntilPosition = lineContent.substring(0, position.column - 1);
        
        const lastOpenBracket = textUntilPosition.lastIndexOf('<');
        if (lastOpenBracket === -1) {
          return { suggestions: [] };
        }
        
        const partialTag = textUntilPosition.substring(lastOpenBracket + 1);
        const textBeforeCursor = model.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });
        
        const isInComment = textBeforeCursor.includes('<!--') && !textBeforeCursor.includes('-->', textBeforeCursor.lastIndexOf('<!--'));
        const isInCDATA = textBeforeCursor.includes('<![CDATA[') && !textBeforeCursor.includes(']]>', textBeforeCursor.lastIndexOf('<![CDATA['));
        const isInString = (textBeforeCursor.match(/"/g) || []).length % 2 === 1;
        
        if (isInComment || isInCDATA || isInString) {
          return { suggestions: [] };
        }
        
        // Cancel previous request
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        
        // Create new abort controller
        abortControllerRef.current = new AbortController();
        
        try {
          setIsLoading(true);
          
          const response = await axios.post(
            "http://localhost:4000/api/deepseek",
            { tag: partialTag },
            {
              signal: abortControllerRef.current.signal,
              timeout: 3000,
            }
          );
          
          if (token.isCancellationRequested) {
            return { suggestions: [] };
          }
          
          const suggestions = response.data.suggestions || [];
          
          return {
            suggestions: suggestions.map((tag) => {
              // Extract tag name without <>
              const tagMatch = tag.match(/<([^>\s]+)/);
              const tagName = tagMatch ? tagMatch[1] : tag.replace(/[<>]/g, '');
              
              return {
                label: tag,
                kind: monaco.languages.CompletionItemKind.Property,
                insertText: tag.startsWith('</') 
                  ? tag 
                  : `${tag.replace(/>$/, '')}$1</${tagName}>`,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: `Insert ${tagName} element`,
                range: {
                  startLineNumber: position.lineNumber,
                  endLineNumber: position.lineNumber,
                  startColumn: lastOpenBracket + 1,
                  endColumn: position.column,
                },
              };
            }),
            incomplete: false,
          };
        } catch (error) {
          if (axios.isCancel(error) || error.message === "canceled") {
            return { suggestions: [] };
          }
          
          console.warn("Autocomplete failed, using fallback:", error);
          
          // Use local fallback suggestions
          const fallbackSuggestions = getLocalSuggestions(partialTag).map(tag => {
            const tagMatch = tag.match(/<([^>\s]+)/);
            const tagName = tagMatch ? tagMatch[1] : tag.replace(/[<>]/g, '');
            
            return {
              label: tag,
              kind: monaco.languages.CompletionItemKind.Property,
              insertText: tag.startsWith('</') 
                ? tag 
                : `${tag.replace(/>$/, '')}$1</${tagName}>`,
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: `Insert ${tagName} element`,
              range: {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: lastOpenBracket + 1,
                endColumn: position.column,
              },
            };
          });
          
          return {
            suggestions: fallbackSuggestions,
            incomplete: false,
          };
        } finally {
          setIsLoading(false);
        }
      },
    });
    
    // Store provider for cleanup
    window.xmlCompletionProvider = provider;
  };

  // Local fallback suggestions when API fails
  const getLocalSuggestions = (partial) => {
    const partialLower = partial.toLowerCase();
    const tagMap = {
      'a': ['<a>', '<article>', '<aside>', '<abbr>'],
      'b': ['<body>', '<br>', '<button>', '<b>'],
      'c': ['<canvas>', '<code>', '<col>'],
      'd': ['<div>', '<dl>', '<dt>', '<dd>'],
      'f': ['<form>', '<fieldset>', '<footer>'],
      'h': ['<h1>', '<h2>', '<h3>', '<head>', '<header>'],
      'i': ['<input>', '<img>', '<iframe>'],
      'l': ['<li>', '<link>', '<label>'],
      'm': ['<main>', '<mark>'],
      'n': ['<nav>'],
      'o': ['<ol>', '<option>'],
      'p': ['<p>', '<pre>', '<picture>'],
      's': ['<span>', '<section>', '<select>', '<strong>'],
      't': ['<table>', '<tr>', '<td>', '<th>', '<title>'],
      'u': ['<ul>'],
      'v': ['<video>'],
    };
    
    if (partialLower.length === 0) {
      return ['<div>', '<span>', '<p>', '<a>', '<ul>', '<li>', '<table>'];
    }
    
    const firstChar = partialLower[0];
    return tagMap[firstChar] || ['<div>', '<span>', '<p>'];
  };

  const handleEditorChange = useCallback((value) => {
    setXmlCode(value);
  }, []);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (window.xmlCompletionProvider) {
        window.xmlCompletionProvider.dispose();
      }
    };
  }, []);

  return (
    <div style={{ 
      height: "500px", 
      border: "1px solid #ddd",
      borderRadius: "4px",
      overflow: "hidden",
      position: "relative"
    }}>
      {isLoading && (
        <div style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "#007acc",
          color: "white",
          padding: "2px 8px",
          borderRadius: "3px",
          fontSize: "12px",
          zIndex: 10
        }}>
          Loading suggestions...
        </div>
      )}
      
      <Editor
        height="100%"
        language="xml"
        value={xmlCode}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          automaticLayout: true,
          wordWrap: "on",
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: false,
          theme: "vs-dark",
          formatOnPaste: true,
          formatOnType: false,
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: "on",
          tabCompletion: "on",
          wordBasedSuggestions: false,
          suggestSelection: "first",
          snippetSuggestions: "inline",
          quickSuggestions: { 
            other: true, 
            comments: false, 
            strings: false 
          },
        }}
        beforeMount={(monaco) => {
          // Configure XML language settings
          monaco.languages.register({ id: 'xml' });
        }}
        loading={
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "100%",
            background: "#1e1e1e",
            color: "#fff"
          }}>
            <div>Loading XML editor...</div>
          </div>
        }
      />
    </div>
  );
};

export default XmlEditor;