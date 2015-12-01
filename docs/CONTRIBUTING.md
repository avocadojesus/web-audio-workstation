## Contributing to TiqTok

In order to contribute to the TiqTok code base, it is recommended that you follow the practices outlined below. These guidelines are to help keep our code looking consistent, as well as to help protect our product from mistakes that could cost us in the long run.

## Style Guide

1. Please set your text editor of choice to use spaces instead of tabs, and set the default tab index to 2 spaces (this is most compatible with other libraies).
2. Use semicolons to end all statements.

## Branches

When checking out TiqTok code, there are three stages to be concerned with, each of which has a corresponding branch.

1. Production (Master)
2. Beta (Development)
3. Alpha (any staging branches)

When building a feature or performing a bug fix, you should always be pulling from development and then branching off into some alpha branch. The branch should be named using some form of gitflow. This means (in a nutshell) that when creating a branch, you should be using the naming convention as follows:

```bash
feature/#12-implement-calendar-widget
hotfix/#13-fix-a-critical-bug
bug/#14-fix-a-minor-bug
```

Once you have completed development on your branch, feel free to submit a pull request to development.

## Code Review

Whenever making a push to development, code review is <b>Manditory</b>. Under no circumstances should anyone being pushing un-reviewed code to our development branch.

## Pushing to Master

Pushing to our master branch should only be done during a release candidate phase. Pushing code to master at any other time is strictly prohibited, so please do not do it. 
