
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 限制1024
#define MAX_LINE 1024

int main()
{
  char buf[MAX_LINE]; /*缓冲区*/
  FILE *fp = fopen("test.txt","r+");     /*文件指针*/
  int len;            /*行字符个数*/
  if(fp == NULL )
  {
    printf("Fail to open file!\n");
    exit(0); //退出程序（结束程序）
  }
  while(fgets(buf, MAX_LINE, fp) != NULL)
  {
    len = strlen(buf);
    // buf[len - 1] = '\0'; /*去掉换行符*/
    printf("%s", buf);
  }
  return 0;
}