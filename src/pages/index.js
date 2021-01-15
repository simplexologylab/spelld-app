import React, { useState, useEffect } from "react"

import styled from "styled-components"

import {
  Box,
  Form,
  Button,
  FormField,
  TextInput,
  Heading,
  Text,
  Meter,
  Layer,
} from "grommet"
import { Play, Close, Restroom } from "grommet-icons"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

const StyledInput = styled(TextInput)`
  background: #ffffff;
  color: #1d6cd2;
  font-family: "Droid Sans";
  font-size: 1.75rem;
  font-weight: 200;
  border: none;

  ::placeholder {
    color: #000000;
  }
`

const IndexPage = () => {
  const initialWords = [
    "trembles",
    "wreckage",
    "slab",
    "possessions",
    "tenement",
    "crushing",
    "rubble",
    "debris",
    "timbers",
    "constructed",
    "Colton farted",
  ]

  const [playing, setPlaying] = useState(false)
  const [word, setWord] = useState("")
  const [words, setWords] = useState(initialWords)

  const [entered, setEntered] = useState("")
  const [test, setTest] = useState(buildTest)
  const [item, setItem] = useState(getTestItem)
  const [done, setDone] = useState(false)
  const [show, setShow] = useState(false)
  const [score, setScore] = useState(0)

  function say(message) {
    var msg = new SpeechSynthesisUtterance()
    msg.text = message
    window.speechSynthesis.speak(msg)
  }

  function buildTest() {
    let newTest = []
    words.forEach((word, index) => {
      newTest.push({
        key: index,
        answer: word,
      })
    })
    return newTest
  }

  useEffect(() => {
    setItem(getTestItem)
    setScore(gradeTest)
  }, [test])

  useEffect(() => {
    setTest(buildTest)
  }, [playing])

  function gradeTest() {
    let score = 0
    test.forEach(item => {
      if (item.entered) {
        if (item.entered.toUpperCase() === item.answer.toUpperCase()) {
          score++
        }
      }
    })
    return score
  }

  function getTestItem() {
    let testItems = test.filter(item => {
      return !item.entered
    })

    if (testItems.length === 0) {
      setDone(true)
    } else {
      return testItems[Math.floor(Math.random() * testItems.length)]
    }
  }

  function handleUpdate(id) {
    const newTest = [...test]
    setTest(
      newTest.map(el =>
        el.key === id ? { ...el, entered: entered.studentAnswer } : el
      )
    )
    setEntered("")
  }

  function handleReset() {
    setTest(buildTest)
    setDone(false)
  }

  function handleDelete(word) {
    setWords([...words].filter(w => {
      return w !== word
    }))
  }

  return (
    <Layout>
      <SEO title="Home" />
      <Box direction="row" gap="medium" justify="center">
        <Button
          label={playing ? "Stop Test" : "Start Test"}
          onClick={() => setPlaying(!playing)}
        />
        {playing && <Button label="Reset" onClick={handleReset} />}
      </Box>
      {playing ? (
        <Box elevation="medium" pad="medium" margin="medium" gap="small">
          {done ? (
            <Box align="center">
              <h1>You've completed all words!</h1>
              <Button label="Get Score" onClick={() => setShow(true)} />
              {show && (
                <Layer
                  onEsc={() => setShow(false)}
                  onClickOutside={() => setShow(false)}
                  position="bottom"
                  full="horizontal"
                >
                  <Box pad="large">
                    <Box direction="row" justify="between">
                      <Box align="center">
                        <Heading>{`You got a ${score} out of ${test.length}`}</Heading>
                      </Box>
                      <Button icon={<Close />} onClick={() => setShow(false)} />
                    </Box>
                    {score === 0 && (
                      <Box
                        direction="row"
                        align="center"
                        justify="center"
                        background="#ffc600"
                        pad="medium"
                        round="xsmall"
                        margin="medium"
                      >
                        <Restroom size="large" color="dark-1" />
                        <Text size="large" color="dark-1">
                          Our advise would be to flush this one down the toilet.
                        </Text>
                      </Box>
                    )}
                    <Box>
                      <pre>{JSON.stringify(test, null, 2)}</pre>
                    </Box>
                  </Box>
                </Layer>
              )}
            </Box>
          ) : (
            <Box>
              <Box
                direction="row-responsive"
                gap="medium"
                align="center"
                justify="center"
              >
                <Form
                  value={entered}
                  onChange={nextValue => setEntered(nextValue)}
                  onReset={() => setEntered("")}
                  onSubmit={() => handleUpdate(item.key)}
                >
                  <FormField name="name" htmlfor="text-input-id">
                    <StyledInput
                      id="text-input-id"
                      name="studentAnswer"
                      placeholder="Enter answer here"
                      value={entered}
                      autocomplete="off"
                      autocorrect="off"
                      autocapitalize="off"
                      spellcheck="false"
                    />
                  </FormField>
                  <Box direction="row" gap="medium" justify="center">
                    <Button
                      label="Play"
                      icon={<Play />}
                      onClick={() => say(item.answer)}
                      color="accent-1"
                    />
                    <Button type="submit" primary label="Submit" />
                  </Box>
                </Form>
              </Box>
            </Box>
          )}
          <Meter
            fill
            values={[
              {
                value: test.filter(item => item.entered).length,
                color: "#ffc600",
              },
              {
                value: test.filter(item => !item.entered).length,
                color: "light-2",
              },
            ]}
            aria-label="meter"
            width="fill"
          />
          <Box gap="small" fill align="center" margin="medium"></Box>
          <Box>
            {test.map(
              item =>
                item.entered && (
                  <Box
                    direction="row"
                    elevation="small"
                    margin="small"
                    pad="medium"
                    justify="between"
                  >
                    <Text>{item.entered}</Text>
                    <Button
                      label={`Play Word`}
                      icon={<Play />}
                      onClick={() => say(item.answer)}
                      color="accent-1"
                    />
                  </Box>
                )
            )}
          </Box>
        </Box>
      ) : (
        <Box elevation="small" pad="medium" margin="medium" align="center">
          <Form
            value={word}
            onChange={nextValue => setWord(nextValue.word)}
            onReset={() => setWord("")}
            onSubmit={() => {
              setWords(words => [...words, word])
              setWord("")
            }}
          >
            <FormField name="name" htmlfor="text-input-id">
              <TextInput
                id="text-input-id"
                placeholder="Enter word here to add"
                name="word"
                value={word}
              />
            </FormField>
            <Box direction="row" gap="medium">
              <Button type="submit" primary label="Add Word" />
            </Box>
          </Form>
          <Box width="medium" pad="xsmall">
            {words.map(word => (
              <Box direction="row" justify="between" align="center">
                <Text margin="none">{word}</Text>
                <Box direction="row">
                  <Button icon={<Play />} onClick={() => say(word)} />
                  <Button icon={<Restroom />} onClick={() => handleDelete(word)} />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Layout>
  )
}

export default IndexPage
