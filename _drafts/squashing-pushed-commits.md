---
layout: post
title: Squashing pushed commits after the code review
categories: git software development
---

During the review process of a [Pull Request], reviewers and maintainers are likely to point out code quality improvements or bugs in your changes. To address these comments, you push additional commits to the pull request's branch.

Once the reviewers are happy with the changes, you'll probably hear something like:

> please squash (please)

They actually mean you should squash _commits_. So...

## What is squashing commits?

> 1. crush or squeeze (something) with force so that it becomes flat, soft, or out of shape.

Squashing commits means combining commits that are part of the same change. Squashing creates a new commit by combining two or more commits, and replaces them in your branch with the combined one.

Commits hold a reference to their `parent` commit (like in a [linked list]), so commits that follow the ones you squashed will have to be rewriten to update their `parent` reference.

Since you are rewriting history, you'll need to use `--force` (or `-f`) when pushing to the branch.

**NB Don't rewrite history in branches where multiple people work.** Most common case: `master`.

If someone else rewrites history in a branch you are working on, you won't be able to push/pull unless you "reconciliate" your local history with the remote history. The easiest way is to delete and pull the branch – problem gone! Things get quite messy if you have unpushed work on that branch, though.

## Why is squashing any good?

Regarding the project's history (`master`), it's usually irrelevant to know that during development:

- you introduced and then fixed bugs or typos
- you changed your mind several times about some text or behaviour

If those commits are still unmerged, e.g. only in your topic branch, squash them into a single meaningful commit! – [Atomic Commits] make reviewing, merging and reverting __way__ easier.


You can read more on `Why squash git commits for pull requests?` in this [Stack Overflow reply].

## How does one squash?

The easiest and most recommended way is using an Interactive Rebase.

As an OSS maintainer, I often come across contributors that need to squash commits for the first time in their life. Recently, when trying to refer one of them to a good "squashing guide", I failed hard at finding one

[Pull Request]: https://help.github.com/articles/using-pull-requests/
[linked list]: https://en.wikipedia.org/wiki/Linked_list
[Atomic Commits]: http://www.freshconsulting.com/atomic-commits/
[Stack Overflow reply]: http://programmers.stackexchange.com/questions/263164/why-squash-git-commits-for-pull-requests#answer-263172
[Rewriting History]: https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History
